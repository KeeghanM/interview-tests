import { Bell, CircleHelp, Command } from 'lucide-react'

export function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">Operations / Service health</p>
        <p className="topbar__shift">
          <span className="live-mark" aria-hidden="true" />
          EU shift active
        </p>
      </div>
      <div className="topbar__actions">
        <button className="shortcut" type="button" aria-label="Open command menu">
          <Command size={14} aria-hidden="true" />
          <span>Quick actions</span>
          <kbd>Cmd K</kbd>
        </button>
        <button className="icon-button" type="button" aria-label="Help">
          <CircleHelp size={17} aria-hidden="true" />
        </button>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={17} aria-hidden="true" />
          <span className="notification-dot" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
