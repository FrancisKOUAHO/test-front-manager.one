<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans bg-primary">
    <NavBar />
    <RouterView />
  </div>
</template>