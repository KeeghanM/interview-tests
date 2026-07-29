import { RefreshCw, Share2 } from 'lucide-react'
import type { Service } from '../../types/operations'
import { useServiceDashboard } from '../../hooks/useServiceDashboard'
import { AsyncState } from '../shared/AsyncState'
import { IncidentList } from './IncidentList'
import { SummaryStrip } from './SummaryStrip'

interface DashboardPageProps {
  selectedService: Service
}

export function DashboardPage({ selectedService }: DashboardPageProps) {
  const { dashboard, error, isLoading } = useServiceDashboard(selectedService.id)

  return (
    <main className="dashboard-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Service detail</p>
          <div className="service-title">
            <h1>{selectedService.name}</h1>
            <span className="health-pill">
              <span className="healthy-dot" aria-hidden="true" />
              Operational
            </span>
          </div>
          <p className="page-heading__owner">
            Owned by <strong>{selectedService.owner}</strong>
            <span aria-hidden="true">/</span>
            Production
          </p>
        </div>
        <div className="page-heading__actions">
          <button className="secondary-button" type="button">
            <Share2 size={14} aria-hidden="true" />
            Share view
          </button>
          <button className="primary-button" type="button">
            <RefreshCw
              className={isLoading ? 'is-spinning' : ''}
              size={14}
              aria-hidden="true"
            />
            {isLoading ? 'Syncing' : 'Refresh data'}
          </button>
        </div>
      </section>

      {error && <AsyncState error={error} />}
      {!dashboard && !error ? (
        <AsyncState />
      ) : (
        dashboard && (
          <>
            <SummaryStrip summary={dashboard.summary} />
            <IncidentList incidents={dashboard.incidents} />
          </>
        )
      )}
    </main>
  )
}
