<template>
  <div class="w-full md:w-[300px] xl:w-[400px]">
    <div class="md:fixed w-full md:w-[300px] xl:w-[400px] flex-shrink-0 md:h-screen flex items-center justify-center bg-black/30 backdrop-blur-sm p-8">
      <div class="flex md:flex-col items-center gap-3">
        <img
          :src="avatar"
          class="w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] hover:scale-105 transition-transform"
          alt="avatar"
        >
        <div class="flex flex-col items-center gap-3">
          <div class="font-bold text-3xl">
            {{ username }}
          </div>
          <div class="flex gap-2">
            <a
              v-if="github"
              :href="github"
              class="p-1 transition-transform hover:scale-110 group"
              target="_blank"
            >
              <GithubAlt class="w-8 h-8 group-hover:text-gray-400 transition-colors" />
            </a>
            <a
              v-if="telegram"
              :href="telegram"
              class="p-1 transition-transform hover:scale-110 group"
              target="_blank"
            >
              <TelegramPlane class="w-8 h-8 group-hover:text-gray-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GithubAlt, TelegramPlane } from '@vicons/fa'

defineProps<{
  avatar: string
  username: string
  github?: string
  telegram?: string
}>()
</script>
