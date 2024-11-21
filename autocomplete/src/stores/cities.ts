import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('citites', () => {
  const cities = ref<string[]>([
    'san jose',
    'santiago',
    'san francisco',
    'santa rosa',
    'san juan',
    'sabadell',
    'salamanca',
    'salt lake city',
    'salinas',
    'salem',
    'sausalito',
    'taipei',
    'tel aviv',
    'tempe',
    'termez',
    'temuco',
    'tiajuna',
    'tieling',
    'thousand oaks',
    'thunder bay',
    'tokyo',
    'tulsa',
  ])

  function searchCities(text: string): string[] {
    return cities.value.filter((city) =>
      city.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    )
  }

  return { cities, searchCities }
})
