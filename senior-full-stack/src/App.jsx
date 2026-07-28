import { useEffect, useState } from 'react'

const apiBase = 'http://localhost:3000'

export default function App() {
  const [services, setServices] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [dashboard, setDashboard] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${apiBase}/api/services`).then((response) => response.json()).then((data) => {
      setServices(data)
      setSelectedId(data[0]?.id ?? '')
    }).catch((requestError) => setError(requestError.message))
  }, [])

  useEffect(() => {
    if (!selectedId) return
    setLoading(true)
    setError('')
    fetch(`${apiBase}/api/services/${selectedId}/dashboard`)
      .then((response) => { if (!response.ok) throw new Error('Unable to load service'); return response.json() })
      .then(setDashboard)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [selectedId])

  const selected = services.find((service) => service.id === selectedId)

  return <main className="shell">
    <header><p className="eyebrow">Operations console</p><h1>Service health</h1><p>Live incident context for production services.</p></header>
    {error && <p className="error">{error}</p>}
    <div className="layout"><aside className="panel services"><h2>Services</h2>{services.map((service) => <button key={service.id} className={service.id === selectedId ? 'selected' : ''} onClick={() => setSelectedId(service.id)}><strong>{service.name}</strong><span>{service.owner}</span></button>)}</aside>
    <section className="content"><div className="panel title"><div><p className="eyebrow">Selected service</p><h2>{selected?.name ?? 'Loading'}</h2></div>{loading && <span>Loading...</span>}</div>
    <section className="stats"><article><span>Total incidents</span><strong>{dashboard?.summary.total_incidents ?? '-'}</strong></article><article><span>Active incidents</span><strong>{dashboard?.summary.active_incidents ?? '-'}</strong></article><article><span>Highest severity</span><strong>{dashboard?.summary.highest_severity ?? '-'}</strong></article></section>
    <section className="panel incidents"><h2>Incidents</h2>{dashboard?.incidents.map((incident) => <article key={incident.id}><div><strong>{incident.title}</strong><span>{incident.id} · {new Date(incident.opened_at).toLocaleString()}</span></div><span className={`severity ${incident.severity}`}>{incident.severity}</span><span>{incident.status}</span></article>)}</section></section></div>
  </main>
}
