import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchServiceDashboard } from '../lib/apiClient'
import type { ServiceDashboard } from '../types/operations'

interface DashboardState {
  dashboard: ServiceDashboard | null
  error: string | null
  isLoading: boolean
}

const initialState: DashboardState = {
  dashboard: null,
  error: null,
  isLoading: false,
}

export function useServiceDashboard(serviceId: string): DashboardState {
  const queryClient = useQueryClient()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!serviceId) return

    setState((current) => ({ ...current, error: null, isLoading: true }))
    queryClient
      .fetchQuery({
        queryKey: ['service-dashboard', serviceId],
        queryFn: () => fetchServiceDashboard(serviceId),
      })
      .then((dashboard) =>
        setState((current) => ({ ...current, dashboard })),
      )
      .catch((error: unknown) =>
        setState((current) => ({
          ...current,
          error: error instanceof Error ? error.message : 'Unexpected error',
        })),
      )
      .finally(() =>
        setState((current) => ({ ...current, isLoading: false })),
      )
  }, [queryClient, serviceId])

  return state
}
