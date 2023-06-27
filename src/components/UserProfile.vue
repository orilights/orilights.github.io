<template>
  <div class="flex flex-col items-center">
    <div class="flex w-full p-6 text-xl bg-black/30">
      <img class="w-[60px] h-[60px]" src="/favicon.png" alt="avatar">
      <div class="pl-4">
        <div class="pb-2">
          {{ profileData.username }}
        </div>
        <div class="flex gap-2">
          <a
            v-if="profileData.github"
            :href="profileData.github"
            class="transition-transform hover:scale-110"
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
                '通过 Telegram 联系我',
              )
            "
            @mouseleave="$emit('tipsUpdate', false)"
          >
            <TelegramPlane class="w-6 h-6" />
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
