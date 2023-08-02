<template>
  <a
    :href="link"
    class="inline-block px-6 py-3 break-keep bg-black/30 rounded-lg hover:bg-black/50 transition-all hover:scale-[1.02]"
    target="_blank"
  >
    {{ title }}
  </a>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  link: string
}>()

defineEmits(['tipsUpdate'])
</script>
