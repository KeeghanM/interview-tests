import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildDashboard } from '../api/python_runtime.mjs'

const load = async (name) => JSON.parse(await readFile(new URL(`../api/data/${name}`, import.meta.url), 'utf8'))
const services = await load('services.json')
const incidents = await load('incidents.json')

test('catalog dashboard returns its service and incidents', async () => {
  const dashboard = await buildDashboard(services, incidents, 'catalog-api')
  assert.equal(dashboard.service.id, 'catalog-api')
  assert.deepEqual(dashboard.incidents.map((incident) => incident.id), ['INC-404'])
})

test('summary is derived from the returned incident set', async () => {
  const dashboard = await buildDashboard(services, incidents, 'catalog-api')
  assert.equal(dashboard.summary.total_incidents, dashboard.incidents.length)
  assert.equal(dashboard.summary.active_incidents, dashboard.incidents.filter((incident) => incident.status === 'open').length)
  assert.equal(dashboard.summary.highest_severity, 'high')
})
