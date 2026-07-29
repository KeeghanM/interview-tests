import { CircleAlert, ReceiptText } from 'lucide-react'

interface LoadingStateProps {
  label?: string
}

interface ErrorStateProps {
  onRetry: () => void
}

interface EmptyStateProps {
  hasFilters: boolean
  onClear: () => void
}

export function LoadingState({ label = 'Loading workspace' }: LoadingStateProps) {
  return (
    <div className="async-state" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="async-state async-state--error" role="alert">
      <CircleAlert size={24} strokeWidth={1.7} aria-hidden="true" />
      <div>
        <strong>We couldn't load this view</strong>
        <p>Check that the local API is running, then try again.</p>
      </div>
      <button type="button" className="text-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}

export function EmptyState({ hasFilters, onClear }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <ReceiptText size={26} strokeWidth={1.5} aria-hidden="true" />
      <strong>No expenses found</strong>
      <p>
        {hasFilters
          ? 'Try changing or clearing the current filters.'
          : 'New expense claims will appear here when they are submitted.'}
      </p>
      {hasFilters && (
        <button type="button" className="text-button" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  )
}
