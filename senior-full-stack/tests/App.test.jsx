import { render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import App from '../src/App.jsx'

const jsonResponse = (data) => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(data),
})

afterEach(() => vi.unstubAllGlobals())

test('loads the first service dashboard', async () => {
  vi.stubGlobal('fetch', vi.fn((input) => {
    const url = String(input)
    if (url.endsWith('/api/services')) {
      return jsonResponse([{ id: 'checkout-web', name: 'Checkout Web', owner: 'Commerce Platform' }])
    }
    return jsonResponse({
      service: { id: 'checkout-web', name: 'Checkout Web', owner: 'Commerce Platform' },
      summary: { total_incidents: 1, active_incidents: 1, highest_severity: 'high' },
      incidents: [{ id: 'INC-401', title: 'Payment retries elevated', severity: 'high', status: 'open', opened_at: '2026-07-27T08:15:00Z' }],
    })
  }))

  render(<App />)

  expect(await screen.findByText('Payment retries elevated')).toBeTruthy()
  expect(screen.getAllByText('1')).toHaveLength(2)
})
