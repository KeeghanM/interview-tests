import { Calendar, Check, XCircle } from 'lucide-react'
import type { Expense } from '../../app'
import { useExpenses } from '../../hooks/useQueries'
import './DashboardPage.scss'

export default function DashboardPage() {
  const { data: expenses } = useExpenses()

  function calculateTotals(expenses: Expense[]) {
    const pending = expenses
      .filter((e) => e.status === 'pending')
      .reduce((sum, expense) => sum + Number(expense.amount), 0)
    const approved = expenses
      .filter((e) => e.status === 'approved')
      .reduce((sum, expense) => sum + Number(expense.amount), 0)
    const rejected = expenses
      .filter((e) => e.status === 'rejected')
      .reduce((sum, expense) => sum + Number(expense.amount), 0)
    return { pending, approved, rejected }
  }

  const totals = calculateTotals(expenses ?? [])

  return (
    <div className='dashboard'>
      <h1 className='dashboard__title'>Expense Dashboard</h1>
      <div className='dashboard__stats'>
        <div className='stat-card stat-card--pending'>
          <div className='stat-card__content'>
            <div className='stat-card__icon'>
              <Calendar className='icon icon--medium' />
            </div>
            <div className='stat-card__info'>
              <p className='stat-card__label'>Pending</p>
              <p className='stat-card__value'>
                £{totals.pending.toLocaleString('en-GB')}
              </p>
            </div>
          </div>
        </div>
        <div className='stat-card stat-card--approved'>
          <div className='stat-card__content'>
            <div className='stat-card__icon'>
              <Check className='icon icon--medium' />
            </div>
            <div className='stat-card__info'>
              <p className='stat-card__label'>Approved</p>
              <p className='stat-card__value'>
                £{totals.approved.toLocaleString('en-GB')}
              </p>
            </div>
          </div>
        </div>
        <div className='stat-card stat-card--rejected'>
          <div className='stat-card__content'>
            <div className='stat-card__icon'>
              <XCircle className='icon icon--medium' />
            </div>
            <div className='stat-card__info'>
              <p className='stat-card__label'>Rejected</p>
              <p className='stat-card__value'>
                £{totals.rejected.toLocaleString('en-GB')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='dashboard__recent'>
        <h2 className='dashboard__section-title'>Recent Expenses</h2>
        <div className='table-container'>
          <table className='expenses-table'>
            <thead className='expenses-table__head'>
              <tr>
                <th className='expenses-table__header'>Date</th>
                <th className='expenses-table__header'>Description</th>
                <th className='expenses-table__header'>Amount</th>
                <th className='expenses-table__header'>Status</th>
              </tr>
            </thead>
            <tbody className='expenses-table__body'>
              {expenses
                ?.sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .slice(0, 5)
                .map((expense) => (
                  <tr
                    className='expenses-table__row'
                    key={expense.id}
                  >
                    <td className='expenses-table__cell'>{expense.date}</td>
                    <td className='expenses-table__cell'>
                      {expense.description}
                    </td>
                    <td className='expenses-table__cell'>
                      £{expense.amount.toLocaleString('en-GB')}
                    </td>
                    <td className='expenses-table__cell'>
                      <span
                        className={`status-badge status-badge--${expense.status.toLowerCase()}`}
                      >
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
