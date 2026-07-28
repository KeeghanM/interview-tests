import { readFile } from 'node:fs/promises'
import { loadPyodide } from 'pyodide'

const runtime = loadPyodide()

export async function buildDashboard(services, incidents, serviceId) {
  const pyodide = await runtime
  const source = await readFile(new URL('./dashboard.py', import.meta.url), 'utf8')
  pyodide.globals.set('services_json', JSON.stringify(services))
  pyodide.globals.set('incidents_json', JSON.stringify(incidents))
  pyodide.globals.set('requested_service_id', serviceId)
  await pyodide.runPythonAsync(`${source}\nresult_json = build_dashboard(services_json, incidents_json, requested_service_id)`)
  return JSON.parse(pyodide.globals.get('result_json'))
}
