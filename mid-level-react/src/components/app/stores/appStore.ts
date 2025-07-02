import { create } from 'zustand'
import type { Expense } from '../app'

type PageType = 'dashboard' | 'expenses' | 'add' | 'edit'

interface AppState {
  currentPage: PageType
  setCurrentPage: (page: PageType) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  dateFilter: string
  setDateFilter: (date: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  editingExpense?: Expense
  setEditingExpense: (expense: Expense | undefined) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  statusFilter: 'all',
  setStatusFilter: (status) => set({ statusFilter: status }),
  dateFilter: 'all',
  setDateFilter: (date) => set({ dateFilter: date }),
  sortBy: 'date',
  setSortBy: (sortBy) => set({ sortBy }),
  editingExpense: undefined,
  setEditingExpense: (expense) => set({ editingExpense: expense }),
}))
