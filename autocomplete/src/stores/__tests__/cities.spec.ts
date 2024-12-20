import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCitiesStore } from '../cities'

describe('Cities Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has initial state', () => {
    const store = useCitiesStore()
    expect(store.cities.length).toBe(22)
  })
})
