import { int, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
})

export const employeesTable = sqliteTable('employees', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  role: text().notNull(),
})

export const categoriesTable = sqliteTable('categories', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  active: integer().notNull(), // 0 or 1
})

export const expensesTable = sqliteTable('expenses', {
  id: int().primaryKey({ autoIncrement: true }),
  employeeId: int().notNull(),
  amount: real().notNull(),
  category: text().notNull(),
  description: text().notNull(),
  date: text().notNull(),
  status: text().notNull(),
  receipt: text(),
})
