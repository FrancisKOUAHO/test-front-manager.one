<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CityList from '@/components/CityList.vue'

interface MapboxResponse {
  features: {
    place_name: string
    geometry: {
      coordinates: [number, number]
    }
  }[]
}

const router = useRouter()

const search = ref('')
const timeoutId = ref<number | null>(null)
const results = ref<MapboxResponse['features']>([])

const handleSearch = () => {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value)
  }

  timeoutId.value = window.setTimeout(async () => {
    if (search.value.length !== 0) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.value}.json?access_token=pk.eyJ1IjoiZnJhbmNpc2NvNzgzMDAiLCJhIjoiY2xtdGg3aXAxMDV2NzJ4bGVrY3pmY3ZpNiJ9.zHfrmNTNuOoFQAK--MiNIQ&types=place`
        )
        results.value = response.data.features
      } catch (error) {
        console.error('Error fetching data:', error)
        results.value = []
      }
      return
    }

    results.value = []
  }, 500)
}

const previewCity = (result: MapboxResponse['features'][0]) => {
  const [city, state, country] = result.place_name.split(', ')
  router.push({
    name: 'city',
    params: {
      city: city,
      state: state.replace('', '')
    },
    query: {
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0]
    }
  })
}
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Rechercher une ville"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0pw_1px_0_0_#004E71]"
        v-model="search"
        @input="handleSearch"
      />
      <ul class="absolute bg-primary text-white w-full shadow-md py-2 top-[66px]">
        <li
          v-for="(result, index) in results"
          :key="index"
          class="px-4 py-2 hover:bg-secondary hover:text-primary cursor-pointer"
          @click="previewCity(result)"
        >
          {{ result.place_name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <div>
            Aucun emplacement ajouté. Pour commencer à suivre un emplacement, effectuez une
            recherche dans le champ ci-dessus.
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>
