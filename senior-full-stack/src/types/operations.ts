export type IncidentSeverity = 'low' | 'medium' | 'high'
export type IncidentStatus = 'open' | 'resolved'
export type HighestSeverity = 'none' | IncidentSeverity

export interface Service {
  id: string
  name: string
  owner: string
}

export interface Incident {
  id: string
  service_id: string
  owner: string
  title: string
  severity: IncidentSeverity
  status: IncidentStatus
  opened_at: string
}

export interface DashboardSummary {
  total_incidents: number
  active_incidents: number
  highest_severity: HighestSeverity
}

export interface ServiceDashboard {
  service: Service
  summary: DashboardSummary
  incidents: Incident[]
}
