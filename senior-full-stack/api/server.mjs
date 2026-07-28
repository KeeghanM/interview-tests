import express from 'express'
import { readFile } from 'node:fs/promises'
import { buildDashboard } from './python_runtime.mjs'

const load = async (name) =>
  JSON.parse(await readFile(new URL(`./data/${name}`, import.meta.url), 'utf8'))
const services = await load('services.json')
const incidents = await load('incidents.json')
const app = express()

app.use((_, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})
app.get('/health', (_, response) =>
  response.json({ status: 'ok', runtime: 'python-pyodide' }),
)
app.get('/api/services', (_, response) =>
  response.json(services.map(({ delay_ms, ...service }) => service)),
)
app.get(
  '/api/services/:serviceId/dashboard',
  async (request, response, next) => {
    try {
      const service = services.find(
        (item) => item.id === request.params.serviceId,
      )
      if (!service)
        return response.status(404).json({ error: 'Service not found' })
      await new Promise((resolve) => setTimeout(resolve, service.delay_ms))
      const dashboard = await buildDashboard(services, incidents, service.id)
      if (dashboard.error) return response.status(404).json(dashboard)
      response.json(dashboard)
    } catch (error) {
      next(error)
    }
  },
)
app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Unexpected server error' })
})
app.listen(3000, () => console.log('Python API bridge: http://localhost:3000'))
