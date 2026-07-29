import { Pool } from 'pg'
import type { Incident, Overview, Service } from './types.js'

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function seedDatabase(): Promise<void> {
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

  await pool.query(
    'TRUNCATE deployments, incidents, services RESTART IDENTITY CASCADE',
  )
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

export async function checkDatabase(): Promise<void> {
  await pool.query('SELECT 1')
}

export async function getServices(): Promise<Service[]> {
  const result = await pool.query<Service>(
    'SELECT id, name, owner FROM services ORDER BY name',
  )
  return result.rows
}

export async function getIncidents(serviceId: string): Promise<Incident[]> {
  const result = await pool.query<Incident>(
    `
      SELECT id, title, severity, status, opened_at
      FROM incidents
      WHERE service_id = $1
      ORDER BY opened_at DESC
    `,
    [serviceId],
  )
  return result.rows
}

export async function getOverview(
  serviceId: string,
): Promise<Overview | null> {
  const result = await pool.query<Overview>(
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
    [serviceId],
  )
  return result.rows[0] ?? null
}
