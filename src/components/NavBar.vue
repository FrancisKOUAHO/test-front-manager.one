<script setup lang="ts">

</script>

<template>
<header class="sticky top-0 bg-primary shadow-lg">
  <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
    <RouterLink :to="{name: 'home'}">
      <div class="flex items-center gap-3 flex-1">
        <i class="fa-solid fa-sun text-3xl"></i>
        <p class="text-3xl">La météo locale</p>
      </div>
    </RouterLink>
  </nav>
</header>
</template>