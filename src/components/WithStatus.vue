<template>
  <div class="relative">
    <slot />
    <div class="absolute right-0 top-[-6px] text-xs">
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string
}>()
</script>
