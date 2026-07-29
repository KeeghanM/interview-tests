export type Page = 'dashboard' | 'expenses'
export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected'
export type ExpenseStatusFilter = 'All' | ExpenseStatus
export type ExpenseSort = 'newest' | 'oldest' | 'highest' | 'lowest'

export interface Expense {
  id: number
  merchant: string
  description: string
  amount: number
  date: string
  status: ExpenseStatus
  employee: string
  employee_initials: string
  category: string
}

export interface ExpenseFilters {
  search: string
  status: ExpenseStatusFilter
  sort: ExpenseSort
}

export interface DashboardTotals {
  claimed: number
  pending: number
  approved: number
  rejected: number
}

export interface Dashboard {
  totals: DashboardTotals
  pending_count: number
  recent_expenses: Expense[]
}
