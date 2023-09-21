import { defineStore } from 'pinia'

interface City {
  id: string
  state: string
  city: string
  coords: {
    lat: string
    lng: string
  }
}

export const useSavedCitiesStore = defineStore('savedCities', {
  state: () => ({
    cities: [] as City[]
  }),
  getters: {
    getCityById: (state) => (id: string) => {
      return state.cities.find((city) => city.id === id)
    }
  },
  actions: {
    addCity(city: City) {
      const savedCitiesJSON = localStorage.getItem('savedCities')
      let existingCities: City[] = []

      if (savedCitiesJSON !== null) {
        existingCities = JSON.parse(savedCitiesJSON)
      }

      existingCities.push(city)
      localStorage.setItem('savedCities', JSON.stringify(existingCities))

      this.cities = existingCities
    },
    removeCity(id: string) {
      const savedCitiesJSON = localStorage.getItem('savedCities')
      if (savedCitiesJSON !== null) {
        const existingCities: City[] = JSON.parse(savedCitiesJSON)
        const index = existingCities.findIndex((city) => city.id === id)
        if (index !== -1) {
          existingCities.splice(index, 1)
          localStorage.setItem('savedCities', JSON.stringify(existingCities))

          this.cities = existingCities
        }
      }
    }
  }
})

export const useStore = () => {
  return useSavedCitiesStore()
}
