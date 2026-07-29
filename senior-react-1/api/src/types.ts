import type { QueryResultRow } from 'pg'

export interface Service extends QueryResultRow {
  id: string
  name: string
  owner: string
}

export interface Incident extends QueryResultRow {
  id: string
  title: string
  severity: string
  status: string
  opened_at: Date
}

export interface Overview extends QueryResultRow {
  id: string
  name: string
  total_incidents: number
  active_incidents: number
  latest_version: string
}
