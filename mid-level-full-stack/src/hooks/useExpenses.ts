import { useQuery } from '@tanstack/react-query'
import { fetchExpenses } from '../lib/apiClient'
import type { ExpenseStatusFilter } from '../types/expenses'

export function useExpenses(status: ExpenseStatusFilter) {
  return useQuery({
    queryKey: ['expenses', { status }],
    queryFn: () => fetchExpenses(status),
  })
}
