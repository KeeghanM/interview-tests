import { Check, Eye, X } from 'lucide-react'
import {
  useEditExpense,
  useEmployees,
  useExpenses,
} from '../../hooks/useQueries'
import { StatusType, useAppStore } from '../../stores/appStore'
import './ExpensesTable.scss'

export default function ExpensesTable() {
  const {
    setCurrentPage,
    setEditingExpense,
    searchTerm,
    dateFilter,
    statusFilter,
    sortBy,
  } = useAppStore()

  const { data: expenses } = useExpenses()
  const { data: employees } = useEmployees()
  const editExpenseMutation = useEditExpense()

  function filterByDate(expenseDate: string) {
    if (dateFilter === 'all') return true
    const today = new Date()
    const expDate = new Date(expenseDate)
    if (dateFilter === '30-days') {
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      return expDate >= thirtyDaysAgo
    }
    if (dateFilter === 'this-month') {
      return (
        expDate.getMonth() === today.getMonth() &&
        expDate.getFullYear() === today.getFullYear()
      )
    }
    return true
  }

  function handleStatusChange(expenseId: number, newStatus: StatusType) {
    editExpenseMutation.mutate({
      id: expenseId,
      status: newStatus,
    })
  }

  // Filter and sort expenses based on search term, status, date, and sort criteria
  // This list is what is actually displayed in the table
  const filteredExpenses =
    expenses
      ?.filter((expense) => {
        const employee = (employees ?? []).find(
          (e) => e.id === expense.employeeId
        )
        const matchesSearch =
          searchTerm === '' ||
          expense.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (employee &&
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          expense.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus =
          statusFilter === 'all' || expense.status === statusFilter
        const matchesDate = filterByDate(expense.date)
        return matchesSearch && matchesStatus && matchesDate
      })
      .sort((a, b) => {
        if (sortBy === 'amount') {
          return Number(a.amount) - Number(b.amount)
        }
        if (sortBy === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return 0
      }) ?? []

  return (
    <div className='expenses-table__container'>
      <table className='expenses-table'>
        <thead className='expenses-table__head'>
          <tr>
            <th className='expenses-table__header'>Employee</th>
            <th className='expenses-table__header'>Date</th>
            <th className='expenses-table__header'>Category</th>
            <th className='expenses-table__header'>Description</th>
            <th className='expenses-table__header'>Amount</th>
            <th className='expenses-table__header'>Status</th>
            <th className='expenses-table__header'>Actions</th>
          </tr>
        </thead>
        <tbody className='expenses-table__body'>
          {filteredExpenses.map((expense) => {
            const employee = employees?.find((e) => e.id === expense.employeeId)
            return (
              <tr
                className='expenses-table__row'
                key={expense.id}
              >
                <td className='expenses-table__cell'>
                  {employee ? employee.name : 'Unknown'}
                </td>
                <td className='expenses-table__cell'>{expense.date}</td>
                <td className='expenses-table__cell'>{expense.category}</td>
                <td className='expenses-table__cell'>{expense.description}</td>
                <td className='expenses-table__cell'>
                  £{expense.amount.toFixed(2)}
                </td>
                <td className='expenses-table__cell'>
                  <span
                    className={`status-badge status-badge--${expense.status.toLowerCase()}`}
                  >
                    {expense.status}
                  </span>
                </td>
                <td className='expenses-table__cell'>
                  <div className='expenses-table__actions'>
                    <button
                      onClick={() => {
                        setCurrentPage('edit')
                        setEditingExpense(expense)
                      }}
                      className='expenses-table__action-btn expenses-table__action-btn--view'
                    >
                      <Eye className='expenses-table__action-icon' />
                    </button>
                    {expense.status === 'pending' && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(expense.id, 'approved')
                          }
                          className='expenses-table__action-btn expenses-table__action-btn--approve'
                        >
                          <Check className='expenses-table__action-icon' />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(expense.id, 'rejected')
                          }
                          className='expenses-table__action-btn expenses-table__action-btn--reject'
                        >
                          <X className='expenses-table__action-icon' />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
