<template>
  <a
    :href="itemData.link"
    class="block flex-1 overflow-hidden group relative rounded-lg bg-black min-w-[200px]"
    target="_blank"
    @mouseenter="
      $emit(
        'tipsUpdate',
        true,
        itemData.tips ? itemData.tips : `前往 ${itemData.link}`,
      )
    "
    @mouseleave="$emit('tipsUpdate', false)"
  >
    <img class="w-full transition-all duration-300 group-hover:scale-110 mask-1/2 group-hover:brightness-50" :src="itemData.background">
    <div class="absolute bottom-0 p-2 text-white transition-all duration-300 origin-bottom-left group-hover:scale-125">
      {{ itemData.title }}
    </div>
  </a>
</template>

<script setup lang="ts">
import type { ProjectItem } from '@/types'

defineProps<{
  itemData: ProjectItem
}>()

defineEmits(['tipsUpdate'])
</script>
