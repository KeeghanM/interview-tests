export type Service = {
  id: string
  name: string
  owner: string
}

export type Incident = {
  id: string
  title: string
  severity: string
  status: string
  opened_at: string
}

export type Overview = {
  id: string
  name: string
  total_incidents: number
  active_incidents: number
  latest_version: string
}
