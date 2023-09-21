<script setup lang="ts">
import LoadCityData from "@/components/LoadCityData.vue";
</script>

<template>
  <div>
    <Suspense>
      <LoadCityData/>
      <template #fallback>
        <div>Chargement...</div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>

</style>