import { Box, ChevronRight } from 'lucide-react'
import type { Service } from '../../types/operations'

interface ServiceRailProps {
  services: Service[]
  selectedServiceId: string
  onSelect: (serviceId: string) => void
}

export function ServiceRail({
  services,
  selectedServiceId,
  onSelect,
}: ServiceRailProps) {
  return (
    <aside className="service-rail" aria-label="Production services">
      <div className="service-rail__heading">
        <div>
          <p className="eyebrow">Fleet</p>
          <h2>Services</h2>
        </div>
        <span>{services.length}</span>
      </div>
      <div className="service-list">
        {services.map((service) => {
          const selected = service.id === selectedServiceId
          return (
            <button
              className={`service-item${selected ? ' service-item--selected' : ''}`}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(service.id)}
              key={service.id}
            >
              <span className="service-item__icon" aria-hidden="true">
                <Box size={15} strokeWidth={1.8} />
              </span>
              <span className="service-item__copy">
                <strong>{service.name}</strong>
                <small>{service.owner}</small>
              </span>
              <span className="service-item__state">
                <span className="healthy-dot" aria-label="Healthy" />
                <ChevronRight size={14} aria-hidden="true" />
              </span>
            </button>
          )
        })}
      </div>
      <p className="service-rail__footer">
        <span className="healthy-dot" aria-hidden="true" />
        3 of 3 reporting
      </p>
    </aside>
  )
}
