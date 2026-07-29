import { create } from 'zustand'

import type { ExpenseFilters, Page } from '../types/expenses'

interface WorkspaceState {
  currentPage: Page
  setCurrentPage: (currentPage: Page) => void
  expenseFilters: ExpenseFilters
  setExpenseFilter: <Key extends keyof ExpenseFilters>(
    name: Key,
    value: ExpenseFilters[Key],
  ) => void
  clearExpenseFilters: () => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (currentPage) => set({ currentPage }),
  expenseFilters: {
    search: '',
    status: 'All',
    sort: 'newest',
  },
  setExpenseFilter: (name, value) =>
    set((state) => ({
      expenseFilters: { ...state.expenseFilters, [name]: value },
    })),
  clearExpenseFilters: () =>
    set({
      expenseFilters: { search: '', status: 'All', sort: 'newest' },
    }),
}))
