import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { filterExpenses } from '../api/python_runtime.mjs'

const expenses = JSON.parse(await readFile(new URL('../api/data/expenses.json', import.meta.url), 'utf8'))

test('an omitted status returns every deterministic expense', async () => {
  assert.deepEqual(await filterExpenses(expenses), expenses)
})

test('Pending returns only pending expenses', async () => {
  const result = await filterExpenses(expenses, 'Pending')
  assert.ok(result.length > 0)
  assert.ok(result.every((expense) => expense.status === 'Pending'))
})

test('Approved returns only approved expenses', async () => {
  const result = await filterExpenses(expenses, 'Approved')
  assert.ok(result.length > 0)
  assert.ok(result.every((expense) => expense.status === 'Approved'))
})
