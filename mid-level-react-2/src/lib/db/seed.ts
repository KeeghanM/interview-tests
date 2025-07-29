import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { reset, seed } from 'drizzle-seed'
import * as schema from './schema'

const db = drizzle(process.env.DB_FILE_NAME!)

const CATEGORIES = [
  'Travel',
  'Meals',
  'Office Supplies',
  'Equipment',
  'Training',
  'Software',
  'Marketing',
  'Other',
  'Entertainment',
]

const ROLES = ['Manager', 'Developer', 'Designer', 'Admin', 'HR', 'Finance']

const STATUSES = ['pending', 'approved', 'rejected']

async function main() {
  await reset(db, schema)
  await seed(db, schema).refine((funcs) => ({
    employeesTable: {
      count: 10,
      columns: {
        name: funcs.firstName({ isUnique: true }),
        email: funcs.email(),
        role: funcs.valuesFromArray({
          values: ROLES,
        }),
      },
    },
    expensesTable: {
      count: 100,
      columns: {
        employeeId: funcs.int({
          minValue: 1,
          maxValue: 10,
          isUnique: false,
        }),
        amount: funcs.number({ minValue: 10, maxValue: 150, precision: 2 }),
        category: funcs.valuesFromArray({ values: CATEGORIES }),
        description: funcs.loremIpsum({ sentencesCount: 1 }),
        date: funcs.date({
          minDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          maxDate: new Date(),
        }),
        status: funcs.valuesFromArray({
          values: STATUSES,
        }),
        receipt: funcs.string(),
      },
    },
    categoriesTable: {
      count: CATEGORIES.length,
      columns: {
        name: funcs.valuesFromArray({ values: CATEGORIES, isUnique: true }),
        active: funcs.boolean(),
      },
    },
  }))
}
main()
