import type { IncidentSeverity, IncidentStatus } from '../../types/operations'
import { titleCase } from '../../lib/formatters'

interface StatusBadgeProps {
  value: IncidentSeverity | IncidentStatus
  kind: 'severity' | 'status'
}

export function StatusBadge({ value, kind }: StatusBadgeProps) {
  return (
    <span className={`badge badge--${kind} badge--${value}`}>
      <span className="badge__dot" aria-hidden="true" />
      {titleCase(value)}
    </span>
  )
}
