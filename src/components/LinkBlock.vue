<template>
  <a
    class="block my-2 sm:my-0 sm:flex-1 text-lg text-center py-2 md:py-3 lg:py-4 overflow-hidden bg-black/40 backdrop-blur-md rounded-lg hover:bg-black/50 hover:scale-[1.03] transition-all"
    :href="itemData.link"
    @mouseenter="
      $emit(
        'tipsUpdate',
        true,
        itemData.tips ? itemData.tips : '前往 ' + itemData.link
      )
    "
    @mouseleave="$emit('tipsUpdate', false)"
  >
    {{ itemData.title }}
  </a>
</template>

<script setup lang="ts">
import { LinkItem } from '@/types';

defineProps<{
  itemData: LinkItem;
}>();

defineEmits(['tipsUpdate']);
</script>
