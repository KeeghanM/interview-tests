import { useAppStore } from '../../stores/appStore'
import './Navigation.scss'
export default function Navigation() {
  const { currentPage, setCurrentPage } = useAppStore()
  return (
    <nav className='navigation'>
      <div className='navigation__container'>
        <div className='navigation__content'>
          <div className='navigation__brand'>
            <h1 className='navigation__title'>ExpenseTracker</h1>
            <div className='navigation__menu'>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`navigation__item ${currentPage === 'dashboard' ? 'navigation__item--active' : ''}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('expenses')}
                className={`navigation__item ${currentPage === 'expenses' ? 'navigation__item--active' : ''}`}
              >
                Expenses
              </button>
            </div>
          </div>
          <div className='navigation__user'>Welcome, John Smith</div>
        </div>
      </div>
    </nav>
  )
}
