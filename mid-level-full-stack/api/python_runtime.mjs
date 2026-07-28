import { readFile } from 'node:fs/promises'
import { loadPyodide } from 'pyodide'

const runtime = loadPyodide()
let executionQueue = Promise.resolve()

async function runFilter(expenses, status) {
  const pyodide = await runtime
  const source = await readFile(new URL('./expense_filter.py', import.meta.url), 'utf8')
  pyodide.globals.set('expenses_json', JSON.stringify(expenses))
  pyodide.globals.set('requested_status', status ?? null)
  await pyodide.runPythonAsync(`${source}\nresult_json = filter_expenses(expenses_json, requested_status)`)
  return JSON.parse(pyodide.globals.get('result_json'))
}

export function filterExpenses(expenses, status) {
  const task = executionQueue.then(() => runFilter(expenses, status))
  executionQueue = task.catch(() => undefined)
  return task
}
