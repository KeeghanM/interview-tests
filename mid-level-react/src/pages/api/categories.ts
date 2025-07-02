import type { APIRoute } from 'astro'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { categoriesTable } from '../../lib/db/schema'

const db = drizzle(process.env.DB_FILE_NAME!)

export const GET: APIRoute = async () => {
  const categories = await db.select().from(categoriesTable)
  return new Response(JSON.stringify(categories), {
    headers: { 'Content-Type': 'application/json' },
  })
}
