import { DashboardPage } from '../components/dashboard/DashboardPage'
import { ExpensesPage } from '../components/expenses/ExpensesPage'
import { Sidebar } from '../components/navigation/Sidebar'
import { Topbar } from '../components/navigation/Topbar'
import { useWorkspaceStore } from '../stores/workspaceStore'

export function AppShell() {
  const currentPage = useWorkspaceStore((state) => state.currentPage)

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="workspace">
        <Topbar />
        <main className="workspace__content">
          {currentPage === 'dashboard' ? <DashboardPage /> : <ExpensesPage />}
        </main>
      </div>
    </div>
  )
}
