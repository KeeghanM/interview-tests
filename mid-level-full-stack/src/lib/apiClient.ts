import type { Dashboard, Expense, ExpenseStatusFilter } from '../types/expenses'

async function get<Result>(path: string): Promise<Result> {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error('The finance service could not be reached.')
  }
  return response.json()
}

export function fetchDashboard(): Promise<Dashboard> {
  return get<Dashboard>('/api/dashboard')
}

export function fetchExpenses(status: ExpenseStatusFilter): Promise<Expense[]> {
  const search = new URLSearchParams({ status })
  return get<Expense[]>(`/api/expenses?${search}`)
}
