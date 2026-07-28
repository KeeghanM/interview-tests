import { afterEach, describe, expect, test } from 'vitest'
import { useAppStore } from './appStore'

describe('app store navigation', () => {
  afterEach(() => useAppStore.setState({ currentPage: 'dashboard' }))

  test('changes the current page', () => {
    useAppStore.getState().setCurrentPage('expenses')

    expect(useAppStore.getState().currentPage).toBe('expenses')
  })
})
