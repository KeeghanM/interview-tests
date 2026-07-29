import { Activity, BellRing, Boxes, RadioTower, Settings2 } from 'lucide-react'

const navigation = [
  { label: 'Overview', icon: Activity, active: true },
  { label: 'Incidents', icon: BellRing, active: false },
  { label: 'Deployments', icon: Boxes, active: false },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand" aria-label="Relay home">
        <span className="brand__signal" aria-hidden="true">
          <RadioTower size={18} strokeWidth={2.4} />
        </span>
        <span>Relay</span>
      </div>

      <nav className="sidebar__nav" aria-label="Operations navigation">
        <p className="sidebar__label">Command</p>
        {navigation.map(({ label, icon: Icon, active }) => (
          <button
            className={`nav-link${active ? ' nav-link--active' : ''}`}
            type="button"
            key={label}
          >
            <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar__environment">
        <span className="pulse-dot" aria-hidden="true" />
        <div>
          <strong>Production</strong>
          <span>All systems linked</span>
        </div>
      </div>

      <button className="sidebar__operator" type="button">
        <span className="operator-avatar">AK</span>
        <span>
          <strong>Alex Kim</strong>
          <small>On-call engineer</small>
        </span>
        <Settings2 size={15} aria-hidden="true" />
      </button>
    </aside>
  )
}
