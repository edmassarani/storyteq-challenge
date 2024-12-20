import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Book = {
  title: string
  author: string
}

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([
    {
      title: 'Don Quixote',
      author: 'Miguel De Cervantes',
    },
    {
      title: "Pilgrim's Progress",
      author: 'John Bunyan',
    },
    {
      title: 'Robinson Crusoe',
      author: 'Daniel Defoe',
    },
    {
      title: "Gulliver's Travels",
      author: 'Jonathan Swift',
    },
    {
      title: 'Tom Jones',
      author: 'Henry Fielding',
    },
    {
      title: 'Clarissa',
      author: 'Samuel Richardson',
    },
    {
      title: 'Tristram Shandy',
      author: 'Laurence Sterne',
    },
  ])

  return { books }
})
