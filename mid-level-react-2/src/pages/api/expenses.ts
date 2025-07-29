import type { APIRoute } from 'astro'
import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { expensesTable } from '../../lib/db/schema'

const db = drizzle(process.env.DB_FILE_NAME!)

export const GET: APIRoute = async () => {
  const expenses = await db.select().from(expensesTable)
  return new Response(JSON.stringify(expenses), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  // Remove id if present
  delete data.id
  const [inserted] = await db.insert(expensesTable).values(data).returning()
  return new Response(JSON.stringify(inserted), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const PUT: APIRoute = async ({ request }) => {
  const data = await request.json()
  if (!data.id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), {
      status: 400,
    })
  }
  await db.update(expensesTable).set(data).where(eq(expensesTable.id, data.id))
  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
