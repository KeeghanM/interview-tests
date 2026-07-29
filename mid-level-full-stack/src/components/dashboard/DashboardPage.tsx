import { ArrowRight, Clock3, TrendingUp } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'
import { formatCurrency, formatDate } from '../../lib/formatters'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { ErrorState, LoadingState } from '../shared/AsyncState'
import { StatusBadge } from '../shared/StatusBadge'

export function DashboardPage() {
  const dashboard = useDashboard()
  const setCurrentPage = useWorkspaceStore((state) => state.setCurrentPage)

  if (dashboard.isPending) return <LoadingState label="Preparing overview" />
  if (dashboard.isError) return <ErrorState onRetry={dashboard.refetch} />

  const { totals, pending_count, recent_expenses } = dashboard.data

  return (
    <section className="page dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">July, 2026</p>
          <h1>Good morning, Jamie.</h1>
          <p>Here is what needs your attention today.</p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => setCurrentPage('expenses')}
        >
          Review expenses
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="dashboard-summary">
        <article className="spend-panel">
          <div className="spend-panel__topline">
            <span>Month to date</span>
            <TrendingUp size={18} aria-hidden="true" />
          </div>
          <p className="spend-panel__amount">{formatCurrency(totals.claimed)}</p>
          <p className="spend-panel__caption">
            Total claimed across the studio
          </p>
          <div className="spend-panel__breakdown">
            <div>
              <span>Approved</span>
              <strong>{formatCurrency(totals.approved)}</strong>
            </div>
            <div>
              <span>Pending</span>
              <strong>{formatCurrency(totals.pending)}</strong>
            </div>
          </div>
        </article>

        <article className="attention-panel">
          <div className="attention-panel__icon">
            <Clock3 size={21} aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Approval queue</p>
            <p className="attention-panel__number">{pending_count}</p>
            <p>claims are waiting for review.</p>
          </div>
          <button
            className="text-button"
            type="button"
            onClick={() => setCurrentPage('expenses')}
          >
            Open queue <ArrowRight size={15} aria-hidden="true" />
          </button>
        </article>
      </div>

      <section className="recent-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Latest activity</p>
            <h2>Recent expenses</h2>
          </div>
          <button
            type="button"
            className="text-button"
            onClick={() => setCurrentPage('expenses')}
          >
            View all <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="table-scroll">
          <table className="data-table data-table--compact">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Submitted by</th>
                <th>Date</th>
                <th>Status</th>
                <th className="align-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent_expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <strong>{expense.merchant}</strong>
                    <span>{expense.category}</span>
                  </td>
                  <td>{expense.employee}</td>
                  <td>{formatDate(expense.date)}</td>
                  <td>
                    <StatusBadge status={expense.status} />
                  </td>
                  <td className="align-right amount">
                    {formatCurrency(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
