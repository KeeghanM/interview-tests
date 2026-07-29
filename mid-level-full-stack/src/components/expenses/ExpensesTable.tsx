import { formatCurrency, formatDate } from '../../lib/formatters'
import type { Expense, ExpenseFilters, ExpenseSort } from '../../types/expenses'
import { EmptyState } from '../shared/AsyncState'
import { StatusBadge } from '../shared/StatusBadge'

interface ExpensesTableProps {
  expenses: Expense[]
  filters: ExpenseFilters
  onClear: () => void
}

function matchesSearch(expense: Expense, search: string): boolean {
  const normalizedSearch = search.trim().toLowerCase()
  if (!normalizedSearch) return true

  return [
    expense.merchant,
    expense.description,
    expense.employee,
    expense.category,
  ].some((value) => value.toLowerCase().includes(normalizedSearch))
}

function sortExpenses(expenses: Expense[], sort: ExpenseSort): Expense[] {
  return expenses.toSorted((left, right) => {
    if (sort === 'oldest') return left.date.localeCompare(right.date)
    if (sort === 'highest') return right.amount - left.amount
    if (sort === 'lowest') return left.amount - right.amount
    return right.date.localeCompare(left.date)
  })
}

export function ExpensesTable({
  expenses,
  filters,
  onClear,
}: ExpensesTableProps) {
  const visibleExpenses = sortExpenses(
    expenses.filter((expense) => matchesSearch(expense, filters.search)),
    filters.sort,
  )
  const hasFilters =
    filters.search !== '' || filters.status !== 'All' || filters.sort !== 'newest'

  if (visibleExpenses.length === 0) {
    return <EmptyState hasFilters={hasFilters} onClear={onClear} />
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Submitted by</th>
            <th>Date</th>
            <th>Status</th>
            <th className="align-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {visibleExpenses.map((expense) => (
            <tr key={expense.id}>
              <td className="expense-detail">
                <span className="category-mark" aria-hidden="true">
                  {expense.category.slice(0, 1)}
                </span>
                <span>
                  <strong>{expense.merchant}</strong>
                  <span>{expense.description}</span>
                </span>
              </td>
              <td>
                <span className="employee-cell">
                  <span className="employee-avatar" aria-hidden="true">
                    {expense.employee_initials}
                  </span>
                  {expense.employee}
                </span>
              </td>
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
  )
}
