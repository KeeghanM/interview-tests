import { Bell } from 'lucide-react'
import { useWorkspaceStore } from '../../stores/workspaceStore'

export function Topbar() {
  const currentPage = useWorkspaceStore((state) => state.currentPage)

  return (
    <header className="topbar">
      <div>
        <p className="topbar__kicker">Northstar Studio</p>
        <p className="topbar__location">
          Finance <span>/</span>{' '}
          {currentPage === 'dashboard' ? 'Overview' : 'Expenses'}
        </p>
      </div>
      <button className="icon-button" type="button" aria-label="Notifications">
        <Bell size={19} strokeWidth={1.8} />
        <span className="notification-dot" />
      </button>
    </header>
  )
}
