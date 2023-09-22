<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router'
import {Swiper, SwiperSlide} from 'swiper/vue'

import axios from 'axios'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const router = useRouter()

const loadCityData = async () => {
  try {
    const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${router.currentRoute.value.query.lat}&lon=${router.currentRoute.value.query.lng}&lang=fr&appid=c000e4f393c4056dfacccba87cf88995
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

const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const getCurrentTime = () => {
  const cityTimezoneOffset = data.timezone_offset || 0;
  const currentUTC = data.current.dt * 1000 + cityTimezoneOffset * 1000;
  const currentTime = new Date(currentUTC);
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formattedTime =
      `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ` +
      `${hours >= 12 ? 'PM' : 'AM'}`;

  return formattedTime;
};
</script>

<template>
  <div class="flex flex-col-reverse sm:flex-row">
    <div class="flex-1 p-4">
      <div class="text-white p-4 bg-primary w-full">
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

    <div
        class="sm:w-2/5 rounded-xl shadow-2xl sm:rounded-lg bg-[#19101E] p-14 mt-4 sm:mt-0 h-[100vh]"
    >
      <div class="flex justify-between">
        <h1 class="text-3xl text-white mt-2">{{ router.currentRoute.value.params.city }}</h1>
        <h4 class="text-xl text-white mt-6">{{ getCurrentTime() }}</h4>
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

      <hr class="border-white border-opacity-10 border mt-8 w-full"/>

      <div class="text-white mt-8">
        <h2 class="text-xl">Météo horaire</h2>

        <swiper :slides-per-view="screenWidth >= 640 ? 3 : 1" :direction="'horizontal'" :space-between="20">
          <swiper-slide
              v-for="hourData in data.hourly"
              :key="hourData.dt"
              class="border border-white rounded-b shadow-2xl sm:rounded-lg bg-secondary p-4 mt-4"
          >
            <p class="whitespace-nowrap text-md">
              {{ new Date(hourData.currentTime).toLocaleTimeString('fr', {hour: 'numeric'}) }}
            </p>
            <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`"
                alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;C</p>
          </swiper-slide>
        </swiper>
        <div class="flex justify-center items-center mt-4">
          <svg
              _ngcontent-publisher-front-c31=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="36"
              viewBox="0 0 24 36"
          >
            <path
                _ngcontent-publisher-front-c31=""
                d="M21.1,17.8c-0.4,0-0.7,0.1-1,0.2c-0.4-1-1.4-1.7-2.4-1.7c-0.4,0-0.8,0.1-1.1,0.3c-0.4-0.9-1.3-1.4-2.3-1.4 c-0.3,0-0.6,0-0.9,0.1v-2.9c0-1.5-1.1-2.7-2.6-2.7C9.2,9.6,8,10.8,8,12.2c0,0,0,0.1,0,0.1V23l-1.9-2.2l0,0C5.6,20.2,4.9,20,4.2,20h0 c-0.7,0-1.4,0.3-1.9,0.8c-0.9,0.9-0.9,2.2-0.1,3.6c1,1.8,2.1,3.5,3.1,5c0.7,1.1,1.4,2.1,1.9,3c0.4,0.7,1.6,3.2,1.6,3.2 C8.9,35.8,9.2,36,9.6,36h11.2c0.4,0,0.7-0.3,0.8-0.6c0.2-0.7,2.1-6.5,2.1-8.8v-6.1C23.7,19,22.5,17.8,21.1,17.8z M20.2,20.5 c0-0.5,0.4-0.9,0.8-0.9c0.5,0,0.9,0.4,0.9,0.8c0,0,0,0,0,0.1v6.1c0,1.5-1.1,5.5-1.8,7.6h-10c-0.4-0.8-1.1-2.2-1.4-2.8 c-0.5-0.9-1.2-2-1.9-3.1c-1-1.5-2.1-3.2-3-4.9C3.5,23,3.3,22.3,3.6,22c0.2-0.2,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2l3.4,4 c0.2,0.3,0.6,0.4,1,0.3c0.3-0.1,0.6-0.5,0.6-0.8v-13c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9c0,0,0,0,0,0v8.4 c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9c0,0,0,0,0,0v-2.9c0-0.5,0.4-0.9,0.8-0.9c0.5,0,0.9,0.4,0.9,0.8c0,0,0,0,0,0.1v4.1 c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9V19c0-0.5,0.4-0.9,0.8-0.9s0.9,0.4,0.9,0.8c0,0,0,0,0,0.1v4.1c0,0.5,0.4,0.9,0.9,0.9 s0.9-0.4,0.9-0.9c0,0,0,0,0,0L20.2,20.5L20.2,20.5z"
                fill="#fff"
            ></path>
            <path
                _ngcontent-publisher-front-c31=""
                d="M10.3,4.1h7.4l-2.8,2.7h2l3.5-3.4L16.8,0h-2l2.8,2.7h-7.4V4.1z"
                fill="#fff"
            ></path>
            <path
                _ngcontent-publisher-front-c31=""
                d="M10.8,2.7H3.5L6.3,0h-2L0.8,3.4l3.5,3.4h2L3.5,4.1h7.4L10.8,2.7z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="text-white mt-8">
        <h2 class="text-xl">Prévisions sur 7 jours</h2>

        <swiper
            :slides-per-view="screenWidth >= 640 ? 4 : 1"
            :space-between="0"
            :direction="'vertical'"
            :pagination="{clickable: screenWidth >= 640 }"
            :style="{ height: screenWidth >= 640 ? '350px' : '150px'}"
            >
          <swiper-slide
              v-for="day in data.daily"
              :key="day.dt"
              class="border border-white rounded-b shadow-2xl sm:rounded-lg bg-secondary p-4 mt-4"
          >
            <div class="slide-content">
              <p class="flex-1">
                {{ new Date(day.dt * 1000).toLocaleDateString('fr', {weekday: 'long'}) }}
              </p>
              <img
                  class="w-[50px] h-[50px] object-cover"
                  :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                  alt=""
              />
              <div class="flex gap-2 flex-1 justify-end">
                <p>H: {{ Math.round(day.temp.max) }} °C</p>
                <p>B: {{ Math.round(day.temp.min) }} °C</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>

      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-content {
  display: flex;
  align-items: center;
  overflow: hidden;
  max-height: 100%;
}
</style>
