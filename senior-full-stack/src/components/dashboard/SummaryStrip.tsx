import { AlertOctagon, Layers3, ShieldCheck } from 'lucide-react'
import { titleCase } from '../../lib/formatters'
import type { DashboardSummary } from '../../types/operations'

interface SummaryStripProps {
  summary: DashboardSummary | undefined
}

export function SummaryStrip({ summary }: SummaryStripProps) {
  const metrics = [
    {
      label: 'Total incidents',
      value: summary?.total_incidents ?? '--',
      detail: 'Recorded for service',
      icon: Layers3,
      tone: 'neutral',
    },
    {
      label: 'Active now',
      value: summary?.active_incidents ?? '--',
      detail: 'Requires attention',
      icon: AlertOctagon,
      tone: 'alert',
    },
    {
      label: 'Highest severity',
      value: summary ? titleCase(summary.highest_severity) : '--',
      detail: summary?.highest_severity === 'none' ? 'No incidents' : 'Current window',
      icon: ShieldCheck,
      tone: 'severity',
    },
  ]

  return (
    <section className="summary-strip" aria-label="Incident summary">
      {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
        <article className={`metric metric--${tone}`} key={label}>
          <span className="metric__icon" aria-hidden="true">
            <Icon size={17} strokeWidth={1.8} />
          </span>
          <div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </div>
        </article>
      ))}
    </section>
  )
}
