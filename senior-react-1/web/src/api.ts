import type { Incident, Overview, Service } from './types'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

export function getServices(): Promise<Service[]> {
  return getJson('/api/services')
}

export function getIncidents(serviceId: string): Promise<Incident[]> {
  return getJson(`/api/services/${serviceId}/incidents`)
}

export function getOverview(serviceId: string): Promise<Overview> {
  return getJson(`/api/services/${serviceId}/overview`)
}
