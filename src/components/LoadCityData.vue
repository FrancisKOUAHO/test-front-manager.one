<script setup lang="ts">
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();

const loadCityData = async () => {
  try {
    const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${router.currentRoute.value.query.lat}&lon=${router.currentRoute.value.query.lng}&exclude={part}&appid=c000e4f393c4056dfacccba87cf88995
&units=imperial`
    );

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = response.data.current.dt * 1000 + localOffset;
    response.data.currentTime =
        utc + 1000 * response.data.timezone_offset;

    response.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
          utc + 1000 * response.data.timezone_offset;
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const data = await LoadCityData();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter(
      (city: any) => city.id !== router.currentRoute.value.query.id
  );
  localStorage.setItem(
      "savedCities",
      JSON.stringify(updatedCities)
  );
  router.push({
    name: "home",
  });
};
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>Vous prévisualisez actuellement cette ville, cliquez sur l'icône "🤍" pour commencer à suivre cette ville.</p>
    </div>

    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ router.currentRoute.value.params.city }}</h1>
      <p class="text-sm mb-12"></p>
      <p class="text-8xl mb-8"> {{ Math.round(data?.current.temp) }} &deg;</p>
      <p>Ressenti comme {{ Math.round(data?.current.feels_like) }} &deg;</p>
      <p class="capitalize">{{ data?.current.weather[0].description }} </p>
      <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`"
           alt=""/>
    </div>

    <hr class="border-white border-opacity-10 border w-full"/>

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Météo horaire</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div v-for="hourData in data.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              {{ new Date(hourData.currentTime).toLocaleTimeString("fr", {hour: "numeric"}) }}</p>
            <img class="w-auto h-[50px] object-cover"
                 :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt=""/>
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full"/>

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Prévisions sur 7 jours</h2>
        <div v-for="day in data.daily" :key="day.dt" class="flex items-center">
          <p class="flex-1">{{ new Date(day.dt * 1000).toLocaleDateString("fr", {weekday: "long"}) }}</p>
          <img class="w-[50px] h-[50px] object-cover"
               :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt=""/>
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>B: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
        @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Retirer la ville</p>
    </div>
  </div>
</template>