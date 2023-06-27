<template>
  <a
    class="block flex-1 overflow-hidden group relative rounded-lg bg-black min-w-[250px]"
    :href="itemData.link"
    target="_blank"
    @mouseenter="
      $emit(
        'tipsUpdate',
        true,
        `前往 ${itemData.title}`,
      )
    "
    @mouseleave="$emit('tipsUpdate', false)"
  >
    <img class="w-full transition-all duration-300 group-hover:scale-110 mask-1/2 group-hover:brightness-50" :src="itemData.background" alt="">
    <div class="absolute bottom-0 p-2 text-lg text-white transition-all duration-300 origin-bottom-left group-hover:scale-125">
      {{ itemData.title }}
    </div>
  </a>
</template>

<script setup lang="ts">
import type { WorkItem } from '@/types'

defineProps<{
  itemData: WorkItem
}>()

defineEmits(['tipsUpdate'])
</script>
