import cors from 'cors'
import express from 'express'
import pg from 'pg'

const { Pool } = pg
const app = express()
const port = Number(process.env.PORT ?? 3000)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

app.use(cors())
app.use(express.json())

async function seedDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      service_id TEXT NOT NULL REFERENCES services(id),
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      status TEXT NOT NULL,
      opened_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS deployments (
      id TEXT PRIMARY KEY,
      service_id TEXT NOT NULL REFERENCES services(id),
      version TEXT NOT NULL,
      deployed_at TIMESTAMPTZ NOT NULL
    );
  `)

  await pool.query('TRUNCATE deployments, incidents, services RESTART IDENTITY CASCADE')
  await pool.query(`
    INSERT INTO services (id, name, owner) VALUES
      ('billing', 'Billing API', 'Revenue Platform'),
      ('checkout', 'Checkout Web', 'Growth'),
      ('search', 'Search Indexer', 'Discovery');

    INSERT INTO incidents (id, service_id, title, severity, status, opened_at) VALUES
      ('inc-101', 'billing', 'Payment webhook retries exhausted', 'high', 'open', '2026-05-14T08:30:00Z'),
      ('inc-102', 'billing', 'Ledger export delayed', 'medium', 'investigating', '2026-05-14T09:15:00Z'),
      ('inc-201', 'checkout', 'Basket totals intermittently stale', 'critical', 'open', '2026-05-14T10:00:00Z'),
      ('inc-202', 'checkout', 'Promo validation latency', 'low', 'resolved', '2026-05-13T15:20:00Z'),
      ('inc-301', 'search', 'Index lag above threshold', 'medium', 'resolved', '2026-05-12T11:45:00Z');

    INSERT INTO deployments (id, service_id, version, deployed_at) VALUES
      ('dep-101', 'billing', '2026.05.14.1', '2026-05-14T07:40:00Z'),
      ('dep-201', 'checkout', '2026.05.14.3', '2026-05-14T09:45:00Z'),
      ('dep-301', 'search', '2026.05.12.2', '2026-05-12T10:10:00Z');
  `)
}

app.get('/health', async (request, response) => {
  await pool.query('SELECT 1')
  response.json({ status: 'ok' })
})

app.get('/api/services', async (request, response) => {
  const result = await pool.query('SELECT id, name, owner FROM services ORDER BY name')
  response.json(result.rows)
})

app.get('/api/services/:serviceId/incidents', async (request, response) => {
  const result = await pool.query(
    `
      SELECT id, title, severity, status, opened_at
      FROM incidents
      WHERE service_id = $1
      ORDER BY opened_at DESC
    `,
    [request.params.serviceId],
  )
  response.json(result.rows)
})

app.get('/api/services/:serviceId/overview', async (request, response) => {
  const result = await pool.query(
    `
      SELECT
        s.id,
        s.name,
        COUNT(i.id)::int AS total_incidents,
        COUNT(i.id) FILTER (WHERE i.status <> 'resolved')::int AS active_incidents,
        COALESCE(MAX(d.version), 'none') AS latest_version
      FROM services s
      LEFT JOIN incidents i ON i.service_id = s.id
      LEFT JOIN deployments d ON d.service_id = s.id
      WHERE s.id = $1
      GROUP BY s.id, s.name
    `,
    [request.params.serviceId],
  )

  if (result.rowCount === 0) {
    response.status(404).json({ error: 'Service not found' })
    return
  }

  response.json(result.rows[0])
})

seedDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
