import type { Incident, Overview, Service } from '../types'

type DashboardProps = {
  services: Service[]
  selectedService: Service | undefined
  selectedServiceId: string
  incidents: Incident[]
  overview: Overview | null
  onSelectService: (serviceId: string) => void
}

export function Dashboard({
  services,
  selectedService,
  selectedServiceId,
  incidents,
  overview,
  onSelectService,
}: DashboardProps) {
  return (
    <section className="layout">
      <aside className="panel services">
        <h2>Services</h2>
        {services.map((service) => (
          <button
            className={
              service.id === selectedServiceId ? 'service selected' : 'service'
            }
            key={service.id}
            onClick={() => onSelectService(service.id)}
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
                <span className={`severity ${incident.severity}`}>
                  {incident.severity}
                </span>
                <span>{incident.status}</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  )
}
