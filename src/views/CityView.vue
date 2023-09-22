<script setup lang="ts">
import LoadCityData from '@/components/LoadCityData.vue'
</script>

<template>
  <div>
    <Suspense>
      <LoadCityData/>
      <template #fallback>
        <div class="flex justify-center items-center text-white">
          <h2>
            Chargement des données ....
          </h2>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
