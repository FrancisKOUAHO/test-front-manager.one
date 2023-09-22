<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: 'fa-solid fa-info-circle text-2xl',
  },
});
</script>

<template>
  <div class="flex justify-around items-center gap-4 text-white border border-white rounded-b shadow-2xl sm:rounded-lg bg-secondary p-6 mt-4 w-[400px]">
    <i :class="iconClass"></i>
    <div class="flex-col">
      <h4 class="mb-2">{{ title }}</h4>
      <p class="flex-1 text-center">
        {{ value }}
        <span>{{ unit }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>