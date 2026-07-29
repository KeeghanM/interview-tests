import { create } from 'zustand'

interface ServiceState {
  selectedServiceId: string
  selectService: (serviceId: string) => void
}

export const useServiceStore = create<ServiceState>((set) => ({
  selectedServiceId: '',
  selectService: (selectedServiceId) => set({ selectedServiceId }),
}))
