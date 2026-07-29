import type { ExpenseStatus } from '../../types/expenses'

interface StatusBadgeProps {
  status: ExpenseStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  )
}
