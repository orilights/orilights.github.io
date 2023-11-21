<template>
  <div
    class="px-3 py-2 bg-black/40 w-fit rounded-lg"
    :class="{
      ' grayscale text-gray-400': disabled,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>
