<template>
  <a
    class="flex-1 text-lg text-center py-2 sm:py-3 overflow-hidden bg-black/30 rounded-lg hover:bg-black/50 hover:scale-[1.03] transition-all min-w-[120px]"
    :href="itemData.link"
    @mouseenter="
      $emit(
        'tipsUpdate',
        true,
        itemData.tips ? itemData.tips : `前往 ${itemData.link}`,
      )
    "
    @mouseleave="$emit('tipsUpdate', false)"
  >
    {{ itemData.title }}
  </a>
</template>

<script setup lang="ts">
import type { LinkItem } from '@/types'

defineProps<{
  itemData: LinkItem
}>()

defineEmits(['tipsUpdate'])
</script>
