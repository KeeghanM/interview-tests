import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Category, Employee, Expense } from '../app'

export const useExpenses = () => {
  return useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => {
      const res = await fetch('/api/expenses')
      return res.json()
    },
  })
}

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await fetch('/api/employees')
      return res.json()
    },
  })
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories')
      return res.json()
    },
  })
}

export const useAddExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (expenseData: any) => {
      await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}

export const useEditExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (expenseData: any) => {
      await fetch('/api/expenses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}
