<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from 'uuid';

const savedCities = ref<any[]>([]);
const route = useRoute();
const router = useRouter();

const addCity = () => {
  const savedCitiesJSON = localStorage.getItem("savedCities");
  let existingCities: any[] = [];

  if (savedCitiesJSON !== null) {
    existingCities = JSON.parse(savedCitiesJSON);
  }

  const locationObj = {
    id: uuidv4(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  existingCities.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(existingCities));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

onMounted(() => {
  const savedCitiesJSON = localStorage.getItem("savedCities");
  if (savedCitiesJSON !== null) {
    savedCities.value = JSON.parse(savedCitiesJSON) || [];
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
