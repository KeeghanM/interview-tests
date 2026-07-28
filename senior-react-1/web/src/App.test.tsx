import { render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import App from './App'

const jsonResponse = (data: unknown) =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
  } as Response)

afterEach(() => vi.unstubAllGlobals())

test('loads the first service dashboard', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn((input: string | URL | Request) => {
      const url = String(input)
      if (url.endsWith('/api/services')) {
        return jsonResponse([
          { id: 'billing', name: 'Billing API', owner: 'Revenue Platform' },
        ])
      }
      if (url.endsWith('/incidents')) {
        return jsonResponse([
          {
            id: 'inc-101',
            title: 'Webhook retries',
            severity: 'high',
            status: 'open',
            opened_at: '2026-05-14T08:30:00Z',
          },
        ])
      }
      return jsonResponse({
        id: 'billing',
        name: 'Billing API',
        total_incidents: 1,
        active_incidents: 1,
        latest_version: '2026.05.14.1',
      })
    }),
  )

  render(<App />)

  expect(await screen.findByText('Webhook retries')).toBeTruthy()
  expect(screen.getByText('2026.05.14.1')).toBeTruthy()
})
