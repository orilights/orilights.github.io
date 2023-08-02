<template>
  <a
    :href="link"
    class="inline-block overflow-hidden group relative rounded-lg bg-black w-full sm:w-[300px]"
    target="_blank"
  >
    <img
      class="w-full transition-all duration-300 group-hover:scale-110 mask-1/2 group-hover:brightness-50"
      :src="background"
    >
    <div class="absolute top-0 p-2 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      {{ description }}
    </div>
    <div class="absolute bottom-0 p-2 text-white transition-all duration-300 origin-bottom-left group-hover:scale-125">
      {{ title }}
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  link: string
  description: string
  background: string
}>()

defineEmits(['tipsUpdate'])
</script>
