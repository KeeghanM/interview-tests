import type { APIRoute } from 'astro'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { employeesTable } from '../../lib/db/schema'

const db = drizzle(process.env.DB_FILE_NAME!)

export const GET: APIRoute = async () => {
  const employees = await db.select().from(employeesTable)
  return new Response(JSON.stringify(employees), {
    headers: { 'Content-Type': 'application/json' },
  })
}
