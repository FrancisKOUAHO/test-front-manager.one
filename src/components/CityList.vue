<template>
  <div class="flex gap-28 flex-wrap w-full">
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="viewCity(city)" />
    </div>
  </div>

  <p v-if="savedCities.length === 0">
    Aucun emplacement ajouté. Pour commencer à suivre un emplacement, recherchez-le dans le champ
    ci-dessus.
  </p>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CityCard from '@/components/CityCard.vue'

const savedCities = ref([])
const fetchCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))

    const requests = []
    savedCities.value.forEach((city) => {
      requests.push(
          axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
          )
      )
    })

    const weatherData = await Promise.all(requests)

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data
    })
  }
}

await fetchCities()

const router = useRouter()
const viewCity = (city) => {
  router.push({
    name: 'city',
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng
    }
  })
}
</script>
