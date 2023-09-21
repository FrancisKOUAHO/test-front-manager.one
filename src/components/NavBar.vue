<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSavedCitiesStore } from '@/stores/savedCities'
import { v4 as uuidv4 } from 'uuid'

interface City {
  id: string
  state: string
  city: string
  coords: {
    lat: string
    lng: string
  }
}

const route = useRoute()
const savedCitiesStore = useSavedCitiesStore()

const isCitySaved = computed(() => {
  return savedCitiesStore.cities.some((city) => city.city === route.params.city)
})
console.log(route.query.lat, route.query.lng)

const toggleCitySaved = () => {
  if (isCitySaved.value) {
    const city = savedCitiesStore.cities.find((city) => city.city === route.params.city)
    if (city) {
      savedCitiesStore.removeCity(city.id)
    }
  } else {
    const locationObj = {
      id: uuidv4(),
      state: route.params.state,
      city: route.params.city,
      coords: {
        lat: route.query.lat,
        lng: route.query.lng
      }
    }
    savedCitiesStore.addCity(<City>locationObj)
  }
}
</script>

<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <router-link :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-3xl"></i>
          <p class="text-3xl">Météo</p>
        </div>
      </router-link>

      <div class="flex flex-1 gap-3 justify-end">
        <i
          class="fa-solid fa-heart text-2xl hover:text-red-500 duration-150 cursor-pointer"
          :class="{ 'text-red-500': isCitySaved }"
          @click="toggleCitySaved"
          v-if="route.query"
        ></i>
      </div>
    </nav>
  </header>
</template>
