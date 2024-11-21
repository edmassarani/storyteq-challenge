<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  placeholder: string
  options: string[] | { [key: string]: string }[]
  filterProp?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Type to search...',
  options: () => [],
  filterProp: undefined,
})

const inputText = ref('')

const displayedOptions = computed(() => {
  if (inputText.value.length < 3) return []

  return props.options.filter((option) => {
    let value = ''

    if (typeof option === 'string') {
      value = option
    } else {
      value = option[props.filterProp ?? ''] ?? ''
    }

    return value.toLocaleLowerCase().includes(inputText.value.toLocaleLowerCase())
  })
})
</script>

<template>
  <div>
    <input
      v-model="inputText"
      class="w-full rounded border px-3 py-2 outline-none"
      type="text"
      :placeholder="placeholder"
      autofocus
    />
  </div>
</template>

<style scoped></style>
