<template>
  <div class="flex flex-col items-center">
    <div class="px-6 py-4 text-xl rounded-lg bg-black/40 backdrop-blur-md">
      <img class="w-[100px] h-[100px] mx-auto" src="/favicon.png" alt="avatar">
      <div class="py-2 text-center">
        {{ profileData.username }}
      </div>
      <div class="flex justify-center gap-2">
        <a
          v-if="profileData.github"
          :href="profileData.github"
          class="transition-transform hover:scale-110"
          target="_blank"
          @mouseenter="
            $emit(
              'tipsUpdate',
              true,
              '前往 GitHub',
            )
          "
          @mouseleave="$emit('tipsUpdate', false)"
        >
          <GithubAlt class="w-6 h-6" />
        </a>
        <a
          v-if="profileData.telegram"
          :href="profileData.telegram"
          class="transition-transform hover:scale-110"
          target="_blank"
          @mouseenter="
            $emit(
              'tipsUpdate',
              true,
              '前往 Telegram',
            )
          "
          @mouseleave="$emit('tipsUpdate', false)"
        >
          <TelegramPlane class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GithubAlt, TelegramPlane } from '@vicons/fa'
import type { ProfileData } from '@/types'

defineProps<{
  profileData: ProfileData
}>()
defineEmits(['tipsUpdate'])
</script>
