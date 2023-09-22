<script setup lang="ts">
const { city } = defineProps(['city'])
</script>

<template>
  <div class="flex py-6 px-3 border border-white rounded-b shadow-2xl sm:rounded-lg bg-[#32142E] rounded-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city?.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ Math.round(city?.weather.main.temp) }}&deg;C</p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(city?.weather.main.temp_max) }}&deg;C
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(city?.weather.main.temp_min) }}&deg;C
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
