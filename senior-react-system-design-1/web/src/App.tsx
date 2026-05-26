import { useEffect, useState } from 'react'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

type Service = {
  id: string
  name: string
  owner: string
}

type Incident = {
  id: string
  title: string
  severity: string
  status: string
  opened_at: string
}

type Overview = {
  id: string
  name: string
  total_incidents: number
  active_incidents: number
  latest_version: string
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

export default function App() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<string>('')
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [overview, setOverview] = useState<Overview | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getJson<Service[]>('/api/services')
      .then((data) => {
        setServices(data)
        setSelectedServiceId(data[0]?.id ?? '')
      })
      .catch((requestError) => setError(requestError.message))
  }, [])

  useEffect(() => {
    if (!selectedServiceId) return
    getJson<Incident[]>(`/api/services/${selectedServiceId}/incidents`)
      .then(setIncidents)
      .catch((requestError) => setError(requestError.message))
  }, [selectedServiceId])

  useEffect(() => {
    const initialServiceId = services[0]?.id
    if (!initialServiceId) return
    getJson<Overview>(`/api/services/${initialServiceId}/overview`)
      .then(setOverview)
      .catch((requestError) => setError(requestError.message))
  }, [services])

  const selectedService = services.find((service) => service.id === selectedServiceId)

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Operations Console</p>
        <h1>Service Health Dashboard</h1>
        <p>Trace stale data from the selected service, through React state and API calls, into Postgres.</p>
      </section>

      {error && <p className="error">{error}</p>}

      <section className="layout">
        <aside className="panel services">
          <h2>Services</h2>
          {services.map((service) => (
            <button
              className={service.id === selectedServiceId ? 'service selected' : 'service'}
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
            >
              <strong>{service.name}</strong>
              <span>{service.owner}</span>
            </button>
          ))}
        </aside>

        <section className="content">
          <div className="panel heading-card">
            <div>
              <p className="eyebrow">Selected Service</p>
              <h2>{selectedService?.name ?? 'Loading'}</h2>
            </div>
            <span className="pill">{selectedService?.owner}</span>
          </div>

          <section className="stats">
            <article className="stat">
              <span>Total incidents</span>
              <strong>{overview?.total_incidents ?? '-'}</strong>
            </article>
            <article className="stat">
              <span>Active incidents</span>
              <strong>{overview?.active_incidents ?? '-'}</strong>
            </article>
            <article className="stat">
              <span>Latest deployment</span>
              <strong>{overview?.latest_version ?? '-'}</strong>
            </article>
          </section>

          <section className="panel">
            <h2>Incidents</h2>
            <div className="incident-list">
              {incidents.map((incident) => (
                <article className="incident" key={incident.id}>
                  <div>
                    <strong>{incident.title}</strong>
                    <span>{new Date(incident.opened_at).toLocaleString()}</span>
                  </div>
                  <span className={`severity ${incident.severity}`}>{incident.severity}</span>
                  <span>{incident.status}</span>
                </article>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}
