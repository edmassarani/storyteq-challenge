<script setup lang="ts">
import AutoComplete from './components/AutoComplete.vue'
import { useBooksStore, useCitiesStore } from './stores'

const bookStore = useBooksStore()
const citiesStore = useCitiesStore()
</script>

<template>
  <main class="flex h-full flex-col justify-center">
    <div class="-mt-16 mb-8 flex items-center justify-center gap-4 px-2 py-4">
      <h1 class="text-4xl font-bold">Simple Autocomplete</h1>
      <img class="size-10" alt="Vue logo" src="./assets/logo.svg" />
    </div>

    <div class="flex flex-col items-center justify-center gap-4">
      <AutoComplete class="w-96" placeholder="Search cities..." :options="citiesStore.cities" />
      <AutoComplete
        class="w-96"
        placeholder="Search books..."
        :options="bookStore.books"
        filter-prop="title"
      />
    </div>
  </main>
</template>

<style scoped></style>
