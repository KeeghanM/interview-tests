import cors from 'cors'
import express from 'express'
import {
  checkDatabase,
  getIncidents,
  getOverview,
  getServices,
} from './database.js'
import { simulateServiceLatency } from './latency.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', async (_request, response) => {
  await checkDatabase()
  response.json({ status: 'ok' })
})

app.get('/api/services', async (_request, response) => {
  response.json(await getServices())
})

app.get('/api/services/:serviceId/incidents', async (request, response) => {
  const { serviceId } = request.params
  await simulateServiceLatency(serviceId)
  response.json(await getIncidents(serviceId))
})

app.get('/api/services/:serviceId/overview', async (request, response) => {
  const { serviceId } = request.params
  await simulateServiceLatency(serviceId)

  const overview = await getOverview(serviceId)
  if (!overview) {
    response.status(404).json({ error: 'Service not found' })
    return
  }

  response.json(overview)
})
