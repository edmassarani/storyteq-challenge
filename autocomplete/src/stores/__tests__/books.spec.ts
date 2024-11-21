import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useBooksStore } from '../books'

describe('Books Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has initial state', () => {
    const store = useBooksStore()
    expect(store.books.length).toBe(7)
  })

  it('searches list', () => {
    const store = useBooksStore()
    expect(store.searchBooks('ris')).toEqual([
      {
        title: 'Clarissa',
        author: 'Samuel Richardson',
      },
      {
        title: 'Tristram Shandy',
        author: 'Laurence Sterne',
      },
    ])
  })
})
