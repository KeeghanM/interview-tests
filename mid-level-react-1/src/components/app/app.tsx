import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  categoriesTable,
  employeesTable,
  expensesTable,
} from '../../lib/db/schema'
import './app.scss'
import DashboardPage from './components/DashboardPage/DashboardPage'
import ExpenseForm from './components/ExpenseForm/ExpensesForm'
import ExpensesPage from './components/ExpensesPage/ExpensesPage'
import Navigation from './components/Navigation'
import { useAppStore } from './stores/appStore'

export type Employee = typeof employeesTable.$inferSelect
export type Expense = typeof expensesTable.$inferSelect
export type Category = typeof categoriesTable.$inferSelect

const queryClient = new QueryClient()

function MainApp() {
  const { currentPage } = useAppStore()
  return (
    <div className='app'>
      <Navigation />
      <main className='app__main'>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'expenses' && <ExpensesPage />}
        {(currentPage === 'add' || currentPage === 'edit') && <ExpenseForm />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
    </QueryClientProvider>
  )
}
