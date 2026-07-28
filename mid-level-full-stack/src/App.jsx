import { useEffect, useState } from 'react'

const apiBase = 'http://localhost:3000'

export default function App() {
  const [status, setStatus] = useState('All')
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${apiBase}/api/expenses?status=${encodeURIComponent(status)}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load expenses')
        return response.json()
      })
      .then(setExpenses)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [status])

  return (
    <main className="shell">
      <header>
        <p className="eyebrow">Finance workspace</p>
        <h1>Expenses</h1>
        <p>Review and approve team spending.</p>
      </header>
      <section className="panel">
        <div className="toolbar">
          <h2>Expense claims</h2>
          <label>
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
            </select>
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p className="empty">Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="empty">No expenses found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.merchant}</td>
                  <td>{expense.date}</td>
                  <td>
                    <span className={`pill ${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td>£{expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}
