import express from 'express'
import { readFile } from 'node:fs/promises'
import { filterExpenses } from './python_runtime.mjs'

const app = express()
const expenses = JSON.parse(await readFile(new URL('./data/expenses.json', import.meta.url), 'utf8'))

app.use(express.json())
app.use((_, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/health', (_, response) => response.json({ status: 'ok', runtime: 'python-pyodide' }))
app.get('/api/expenses', async (request, response, next) => {
  try {
    response.json(await filterExpenses(expenses, request.query.status))
  } catch (error) {
    next(error)
  }
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Unexpected server error' })
})

app.listen(3000, () => console.log('Python API bridge: http://localhost:3000'))
