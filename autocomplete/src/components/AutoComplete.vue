<script setup lang="ts">
defineProps<{
  placeholder: string
}>()
</script>

<template>
  <div>
    <input
      class="w-full rounded border px-3 py-2 outline-none"
      type="text"
      :placeholder="placeholder"
      autofocus
    />
  </div>
</template>

<style scoped></style>
