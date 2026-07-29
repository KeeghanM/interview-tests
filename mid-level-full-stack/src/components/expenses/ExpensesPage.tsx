import { Download } from 'lucide-react'
import { useExpenses } from '../../hooks/useExpenses'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { ErrorState, LoadingState } from '../shared/AsyncState'
import { ExpenseFilters } from './ExpenseFilters'
import { ExpensesTable } from './ExpensesTable'

export function ExpensesPage() {
  const filters = useWorkspaceStore((state) => state.expenseFilters)
  const setFilter = useWorkspaceStore((state) => state.setExpenseFilter)
  const clearFilters = useWorkspaceStore((state) => state.clearExpenseFilters)
  const expenses = useExpenses(filters.status)

  return (
    <section className="page expenses-page">
      <div className="page-heading page-heading--expenses">
        <div>
          <p className="eyebrow">Claims ledger</p>
          <h1>Expenses</h1>
          <p>Review submitted costs and monitor approval status.</p>
        </div>
        <button className="secondary-button" type="button">
          <Download size={16} aria-hidden="true" />
          Export CSV
        </button>
      </div>

      <section className="expenses-ledger" aria-label="Expense claims">
        <div className="ledger-heading">
          <div>
            <h2>All claims</h2>
            <p>
              {expenses.data
                ? `${expenses.data.length} results`
                : 'Loading results'}
            </p>
          </div>
          <ExpenseFilters filters={filters} onChange={setFilter} />
        </div>

        {expenses.isPending && <LoadingState label="Loading expenses" />}
        {expenses.isError && <ErrorState onRetry={expenses.refetch} />}
        {expenses.isSuccess && (
          <ExpensesTable
            expenses={expenses.data}
            filters={filters}
            onClear={clearFilters}
          />
        )}
      </section>
    </section>
  )
}
