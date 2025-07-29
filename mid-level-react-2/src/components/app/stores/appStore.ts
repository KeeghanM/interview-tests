import { create } from 'zustand'
import type { Expense } from '../app'

export type PageType = 'dashboard' | 'expenses' | 'add' | 'edit'
export type StatusType = 'all' | 'pending' | 'approved' | 'rejected'
export type DateFilterType = 'all' | '30-days' | 'this-month'
export type SortByType = 'date' | 'amount'

interface AppState {
  currentPage: PageType
  setCurrentPage: (page: PageType) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: StatusType
  setStatusFilter: (status: StatusType) => void
  dateFilter: DateFilterType
  setDateFilter: (date: DateFilterType) => void
  sortBy: SortByType
  setSortBy: (sortBy: SortByType) => void
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
