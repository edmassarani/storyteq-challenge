<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'

type Option = string | { [key: string]: string }

interface Props {
  placeholder: string
  options: Option[]
  filterProp?: string
  displayFn?: (option: Option) => string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Type to search...',
  options: () => [],
  filterProp: undefined,
  displayFn: (option: Option) => JSON.stringify(option),
})

const inputText = ref('')
const isOpen = ref(false)
const selectedIndex = ref(0)
const autocomplete = useTemplateRef('autocomplete')

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

const optionAsString = (option: Option): string => {
  if (typeof option === 'string') {
    return option
  }

  return props.displayFn(option)
}

const selectOption = (option?: Option): void => {
  let newValue = ''
  const selectOption = option ?? displayedOptions.value[selectedIndex.value]

  if (typeof selectOption === 'string') {
    newValue = selectOption
  } else {
    newValue = selectOption[props.filterProp ?? '']
  }

  if (newValue) {
    inputText.value = newValue
  }

  isOpen.value = false
}

const onArrowDown = () => {
  if (selectedIndex.value < displayedOptions.value.length - 1) {
    selectedIndex.value++
  } else {
    selectedIndex.value = 0
  }
}

const onArrowUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  } else {
    selectedIndex.value = displayedOptions.value.length - 1
  }
}

const handleClickOutside = (event: Event) => {
  if (autocomplete.value && !autocomplete.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="autocomplete" class="relative">
    <input
      v-model="inputText"
      class="w-full rounded border px-3 py-2 outline-none"
      type="text"
      :placeholder="placeholder"
      autofocus
      @input="isOpen = true"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="selectOption()"
      @keydown.tab="isOpen = false"
      @focus="isOpen = true"
    />

    <div v-if="isOpen" class="absolute z-10 -mt-1 w-full">
      <p
        v-for="(option, index) in displayedOptions"
        :key="index"
        class="w-full cursor-pointer border border-b-0 bg-white px-2 py-1 last:border-b hover:bg-gray-200"
        :class="{ 'bg-gray-200': index === selectedIndex }"
        @click="selectOption(option)"
      >
        {{ optionAsString(option) }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
