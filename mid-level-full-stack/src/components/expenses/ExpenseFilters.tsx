import { Search, SlidersHorizontal } from 'lucide-react'

import type {
  ExpenseFilters as ExpenseFilterValues,
  ExpenseSort,
  ExpenseStatusFilter,
} from '../../types/expenses'

interface ExpenseFiltersProps {
  filters: ExpenseFilterValues
  onChange: <Key extends keyof ExpenseFilterValues>(
    name: Key,
    value: ExpenseFilterValues[Key],
  ) => void
}

export function ExpenseFilters({ filters, onChange }: ExpenseFiltersProps) {
  return (
    <div className="expense-filters">
      <label className="search-field">
        <span className="sr-only">Search expenses</span>
        <Search size={17} strokeWidth={1.8} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search merchant, person or category"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
        />
      </label>
      <div className="filter-group">
        <SlidersHorizontal size={17} strokeWidth={1.8} aria-hidden="true" />
        <label>
          <span className="sr-only">Filter by status</span>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange('status', event.target.value as ExpenseStatusFilter)
            }
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Sort expenses</span>
          <select
            value={filters.sort}
            onChange={(event) =>
              onChange('sort', event.target.value as ExpenseSort)
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
            <option value="lowest">Lowest amount</option>
          </select>
        </label>
      </div>
    </div>
  )
}
