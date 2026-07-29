import { AlertTriangle, RotateCcw } from 'lucide-react'

interface AsyncStateProps {
  error?: string | null
  onRetry?: () => void
}

export function AsyncState({ error, onRetry }: AsyncStateProps) {
  if (error) {
    return (
      <div className="async-state async-state--error" role="alert">
        <AlertTriangle size={20} aria-hidden="true" />
        <div>
          <strong>Telemetry unavailable</strong>
          <p>{error}</p>
        </div>
        {onRetry && (
          <button className="text-button" type="button" onClick={onRetry}>
            <RotateCcw size={13} aria-hidden="true" />
            Retry
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="async-state" role="status">
      <span className="spinner" aria-hidden="true" />
      Establishing service link
    </div>
  )
}
