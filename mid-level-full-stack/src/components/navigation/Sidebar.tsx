import { LayoutDashboard, ReceiptText } from 'lucide-react'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import type { LucideIcon } from 'lucide-react'
import type { Page } from '../../types/expenses'

const links: Array<{ id: Page; label: string; icon: LucideIcon }> = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'expenses', label: 'Expenses', icon: ReceiptText },
]

export function Sidebar() {
  const currentPage = useWorkspaceStore((state) => state.currentPage)
  const setCurrentPage = useWorkspaceStore((state) => state.setCurrentPage)

  return (
    <aside className="sidebar">
      <button
        className="brand"
        type="button"
        onClick={() => setCurrentPage('dashboard')}
        aria-label="Open overview"
      >
        <span className="brand__mark" aria-hidden="true">
          L
        </span>
        <span>Ledger</span>
      </button>

      <nav className="sidebar__nav" aria-label="Workspace">
        <p className="sidebar__label">Workspace</p>
        {links.map(({ id, label, icon: Icon }) => (
          <button
            className={`nav-link ${currentPage === id ? 'nav-link--active' : ''}`}
            type="button"
            key={id}
            onClick={() => setCurrentPage(id)}
            aria-current={currentPage === id ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__avatar" aria-hidden="true">
          JS
        </div>
        <div>
          <strong>Jamie Smith</strong>
          <span>Finance lead</span>
        </div>
      </div>
    </aside>
  )
}
