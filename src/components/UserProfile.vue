<template>
  <div class="flex flex-col items-center">
    <div class="flex w-full p-6 pb-5 text-xl bg-black/30">
      <img class="w-[60px] h-[60px] hover:scale-105 transition-transform" src="/favicon.png" alt="avatar">
      <div class="pl-4">
        <div class="pb-1 font-bold">
          {{ profileData.username }}
        </div>
        <div class="flex gap-2">
          <a
            v-if="profileData.github"
            :href="profileData.github"
            class="p-1 transition-transform hover:scale-110 group"
            target="_blank"
            @mouseenter="
              $emit(
                'tipsUpdate',
                true,
                '来看看我的 GitHub 吗',
              )
            "
            @mouseleave="$emit('tipsUpdate', false)"
          >
            <GithubAlt class="w-6 h-6 group-hover:text-gray-400 transition-colors" />
          </a>
          <a
            v-if="profileData.telegram"
            :href="profileData.telegram"
            class="p-1 transition-transform hover:scale-110 group"
            target="_blank"
            @mouseenter="
              $emit(
                'tipsUpdate',
                true,
                '通过 Telegram 联系我',
              )
            "
            @mouseleave="$emit('tipsUpdate', false)"
          >
            <TelegramPlane class="w-6 h-6 group-hover:text-gray-400 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GithubAlt, TelegramPlane } from '@vicons/fa'
import type { Profile } from '@/types'

defineProps<{
  profileData: Profile
}>()
defineEmits(['tipsUpdate'])
</script>
