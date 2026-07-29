import { useEffect } from 'react'
import { DashboardPage } from '../components/dashboard/DashboardPage'
import { Sidebar } from '../components/navigation/Sidebar'
import { Topbar } from '../components/navigation/Topbar'
import { ServiceRail } from '../components/services/ServiceRail'
import { AsyncState } from '../components/shared/AsyncState'
import { useServices } from '../hooks/useServices'
import { useServiceStore } from '../stores/serviceStore'

export function AppShell() {
  const servicesQuery = useServices()
  const selectedServiceId = useServiceStore((state) => state.selectedServiceId)
  const selectService = useServiceStore((state) => state.selectService)

  useEffect(() => {
    const firstService = servicesQuery.data?.[0]
    if (!selectedServiceId && firstService) selectService(firstService.id)
  }, [selectService, selectedServiceId, servicesQuery.data])

  const services = servicesQuery.data ?? []
  const selectedService =
    services.find((service) => service.id === selectedServiceId) ?? services[0]

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="workspace">
        <Topbar />
        {servicesQuery.isPending ? (
          <div className="workspace__state">
            <AsyncState />
          </div>
        ) : servicesQuery.isError ? (
          <div className="workspace__state">
            <AsyncState
              error={servicesQuery.error.message}
              onRetry={() => void servicesQuery.refetch()}
            />
          </div>
        ) : selectedService ? (
          <div className="workspace__layout">
            <ServiceRail
              services={services}
              selectedServiceId={selectedService.id}
              onSelect={selectService}
            />
            <DashboardPage selectedService={selectedService} />
          </div>
        ) : (
          <div className="workspace__state">
            <p>No production services are configured.</p>
          </div>
        )}
      </div>
    </div>
  )
}
