import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildDashboard } from '../api/python_runtime.mjs'

const load = async (name) => JSON.parse(await readFile(new URL(`../api/data/${name}`, import.meta.url), 'utf8'))
const services = await load('services.json')
const incidents = await load('incidents.json')

test('checkout dashboard contains only checkout incidents', async () => {
  const dashboard = await buildDashboard(services, incidents, 'checkout-web')
  assert.ok(dashboard.incidents.length > 0)
  assert.ok(dashboard.incidents.every((incident) => incident.service_id === 'checkout-web'))
})

test('summary is derived from the isolated incident set', async () => {
  const dashboard = await buildDashboard(services, incidents, 'search-indexer')
  assert.equal(dashboard.summary.total_incidents, dashboard.incidents.length)
  assert.equal(dashboard.summary.active_incidents, dashboard.incidents.filter((incident) => incident.status === 'open').length)
})
