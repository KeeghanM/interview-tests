import { Plus, Search } from 'lucide-react'
import {
  type DateFilterType,
  type SortByType,
  type StatusType,
  useAppStore,
} from '../../stores/appStore'
import ExpensesTable from '../ExpensesTable/ExpensesTable'
import './ExpensesPage.scss'

export default function ExpensesPage() {
  const {
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  } = useAppStore()

  return (
    <div className='expenses-page'>
      <div className='expenses-page__header'>
        <h1 className='expenses-page__title'>All Expenses</h1>
        <button
          onClick={() => setCurrentPage('add')}
          className='expenses-page__add-btn'
        >
          <Plus className='expenses-page__add-icon' />
          Add Expense
        </button>
      </div>
      <div className='expenses-page__content'>
        <div className='expenses-page__filters'>
          <div className='expenses-page__search'>
            <Search className='expenses-page__search-icon' />
            <input
              type='text'
              placeholder='Search expenses...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='expenses-page__search-input'
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusType)}
            className='expenses-page__select'
          >
            <option value='all'>All Statuses</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
            className='expenses-page__select'
          >
            <option value='all'>All Time</option>
            <option value='30-days'>Last 30 days</option>
            <option value='this-month'>This month</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortByType)}
            className='expenses-page__select'
          >
            <option value='date'>Sort by Date</option>
            <option value='amount'>Sort by Amount</option>
          </select>
        </div>
        <ExpensesTable />
      </div>
    </div>
  )
}
