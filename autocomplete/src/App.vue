<script setup lang="ts">
import AutoComplete from './components/AutoComplete.vue'
</script>

<template>
  <header>
    <div class="flex items-center justify-center gap-4 px-2 py-4">
      <h1 class="text-2xl font-bold">Simple Autocomplete</h1>
      <img class="size-8" alt="Vue logo" src="./assets/logo.svg" />
    </div>
  </header>

  <main class="flex flex-col items-center gap-4">
    <AutoComplete placeholder="Search cities..." class="w-96" />
    <AutoComplete placeholder="Search books..." class="w-96" />
  </main>
</template>

<style scoped></style>
