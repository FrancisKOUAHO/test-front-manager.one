<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const loadCityData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${router.currentRoute.value.query.lat}&lon=${router.currentRoute.value.query.lng}&exclude={part}&appid=c000e4f393c4056dfacccba87cf88995
&units=imperial`
    )

    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = response.data.current.dt * 1000 + localOffset
    response.data.currentTime = utc + 1000 * response.data.timezone_offset

    response.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * response.data.timezone_offset
    })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const data = await loadCityData()

const removeCity = () => {
  const savedCitiesJSON = localStorage.getItem('savedCities')
  let cities: string[] = []

  if (savedCitiesJSON !== null) {
    cities = JSON.parse(savedCitiesJSON)
  }

  const updatedCities = cities.filter((city: any) => city.id !== router.currentRoute.value.query.id)
  localStorage.setItem('savedCities', JSON.stringify(updatedCities))
  router.push({
    name: 'home'
  })
}
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-4">
      <div class="text-white p-4 bg-weather-secondary w-full">
        <p>
          Vous prévisualisez actuellement cette ville, cliquez sur l'icône "🤍" pour commencer à
          suivre cette ville.
        </p>
      </div>

      <div>
        <h1 class="text-xl text-white mt-28">Aperçu de la situation actuelle</h1>
        <p class="text-sm text-white mt-2"></p>
      </div>

      <div class="text-white">
        <span
          class="flex items-center justify-center gap-2 duration-150 hover:text-red-500 cursor-pointer"
          @click="removeCity"
        >
          <i class="fa-solid fa-trash"></i>
          <p>Retirer la ville</p>
        </span>
      </div>
    </div>

    <div class="w-2/5 rounded-xl shadow-2xl sm:rounded-lg bg-[#19101E] p-4">
      <div class="flex justify-between">
        <h1 class="text-3xl text-white mt-2">{{ router.currentRoute.value.params.city }}</h1>
        <h4 class="text-xl text-white mt-6">08:54 AM</h4>
      </div>
      <img
        class="w-[150px] h-auto mt-6"
        :src="`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`"
        alt=""
      />
      <div class="flex justify-between">
        <h1 class="text-7xl text-white">{{ Math.round(data?.current.temp) }} &deg; C</h1>
        <div>
          <h4 class="text-2xl text-white mt-6">
            Ressenti {{ Math.round(data?.current.feels_like) }} &deg;C
          </h4>
          <h4 class="text-xl text-white">{{ data?.current.weather[0].description }}</h4>
        </div>
      </div>

      <hr class="border-white border-opacity-10 border mt-8 w-full" />

      <div class="text-white mt-8">
        <h2 class="text-xl">Météo horaire</h2>

        <div class="max-h-[200px] overflow-y-auto mt-2">
          <div v-for="hourData in data.hourly" :key="hourData.dt" class="flex justify-between">
            <p class="whitespace-nowrap text-md">
              {{ new Date(hourData.currentTime).toLocaleTimeString('fr', { hour: 'numeric' }) }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>

      <div class="text-white mt-8">
        <h2 class="text-xl">Prévisions sur 7 jours</h2>

        <div class="max-h-[300px] overflow-y-auto mt-6">
          <div
            v-for="day in data.daily"
            :key="day.dt"
            class="flex items-center border border-white rounded-b shadow-2xl sm:rounded-lg bg-[#32142E] p-4 mt-2"
          >
            <p class="flex-1">
              {{ new Date(day.dt * 1000).toLocaleDateString('fr', { weekday: 'long' }) }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(day.temp.max) }}</p>
              <p>B: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
