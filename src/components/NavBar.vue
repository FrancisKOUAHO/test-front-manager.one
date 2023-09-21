<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {uid} from "uid";

const savedCities = ref<any[]>([]);
const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities")) || [];
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({query});
};


onMounted(() => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities")) || [];
  }
});
</script>

<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <router-link :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-3xl"></i>
          <p class="text-3xl">La météo locale</p>
        </div>
      </router-link>

      <div class="flex flex-1 gap-3 justify-end">
        <i
            class="fa-solid fa-heart text-2xl hover:text-secondary duration-150 cursor-pointer"
            @click="addCity"
            v-if="route.query"
        ></i>
      </div>
    </nav>
  </header>
</template>
