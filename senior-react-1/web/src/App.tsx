import { useEffect, useState } from 'react'
import { getIncidents, getOverview, getServices } from './api'
import { Dashboard } from './components/Dashboard'
import type { Incident, Overview, Service } from './types'

export default function App() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<string>('')
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [overview, setOverview] = useState<Overview | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data)
        setSelectedServiceId(data[0]?.id ?? '')
      })
      .catch((requestError) => setError(requestError.message))
  }, [])

  useEffect(() => {
    if (!selectedServiceId) return
    getIncidents(selectedServiceId)
      .then(setIncidents)
      .catch((requestError) => setError(requestError.message))
  }, [selectedServiceId])

  useEffect(() => {
    if (!selectedServiceId) return
    getOverview(selectedServiceId)
      .then(setOverview)
      .catch((requestError) => setError(requestError.message))
  }, [selectedServiceId])

  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  )

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Operations Console</p>
        <h1>Service Health Dashboard</h1>
        <p>
          Current incidents, deployment details, and service ownership in one
          place.
        </p>
      </section>

      {error && <p className="error">{error}</p>}

      <Dashboard
        services={services}
        selectedService={selectedService}
        selectedServiceId={selectedServiceId}
        incidents={incidents}
        overview={overview}
        onSelectService={setSelectedServiceId}
      />
    </main>
  )
}
