import { ArrowUpRight, CheckCircle2, Siren } from 'lucide-react'
import { formatOpenedAt } from '../../lib/formatters'
import type { Incident } from '../../types/operations'
import { StatusBadge } from '../shared/StatusBadge'

interface IncidentListProps {
  incidents: Incident[]
}

export function IncidentList({ incidents }: IncidentListProps) {
  return (
    <section className="incidents-panel">
      <div className="incidents-panel__heading">
        <div>
          <p className="eyebrow">Current window</p>
          <h2>Incident timeline</h2>
        </div>
        <button className="text-button" type="button">
          Open incident queue
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>

      {incidents.length ? (
        <div className="incident-list">
          {incidents.map((incident) => (
            <article className="incident-row" key={incident.id}>
              <span className="incident-row__mark" aria-hidden="true">
                {incident.status === 'open' ? (
                  <Siren size={17} />
                ) : (
                  <CheckCircle2 size={17} />
                )}
              </span>
              <div className="incident-row__identity">
                <strong>{incident.title}</strong>
                <span>
                  {incident.id} &middot; Opened {formatOpenedAt(incident.opened_at)}
                </span>
              </div>
              <span className="incident-row__owner">{incident.owner}</span>
              <StatusBadge kind="severity" value={incident.severity} />
              <StatusBadge kind="status" value={incident.status} />
              <button className="row-action" type="button" aria-label={`Open ${incident.id}`}>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <CheckCircle2 size={24} aria-hidden="true" />
          <strong>No incidents in this window</strong>
          <p>This service is reporting normally.</p>
        </div>
      )}
    </section>
  )
}
