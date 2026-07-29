import type { Service, ServiceDashboard } from '../types/operations'

async function get<Result>(path: string): Promise<Result> {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error('Service telemetry could not be loaded.')
  }
  return response.json() as Promise<Result>
}

export function fetchServices(): Promise<Service[]> {
  return get<Service[]>('/api/services')
}

export function fetchServiceDashboard(
  serviceId: string,
): Promise<ServiceDashboard> {
  return get<ServiceDashboard>(`/api/services/${serviceId}/dashboard`)
}
