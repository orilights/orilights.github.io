<template>
  <Transition name="bg-show">
    <div
      class="w-screen h-screen fixed top-0 left-0 z-[-1] bg"
      v-show="loaded"></div>
  </Transition>
  <div
    class="z-10 flex flex-col items-center justify-center w-full min-h-screen py-8 text-white bg-black/20">
    <Transition name="main-show">
      <div class="w-full md:w-[700px] px-6 md:px-0" v-show="loaded">
        <UserProfile :username="username" />
        <div v-for="col in links" class="mb-4">
          <div
            class="px-4 py-1 mb-2 text-xl font-bold rounded-lg w-fit bg-black/40 backdrop-blur-md">
            {{ col.title }}
          </div>
          <div class="justify-between sm:flex sm:gap-x-6">
            <LinkBlock
              v-for="item in col.links"
              :item-data="item"
              @tips-update="handleTipsUpdate" />
          </div>
        </div>
      </div>
    </Transition>
    <div class="hidden md:block" id="cursor-container"></div>
    <footer
      class="fixed bottom-0 left-0 w-full py-1 overflow-hidden text-center bg-black/40 backdrop-blur"
      v-show="loaded">
      <Transition name="scale-x">
        <div
          class="absolute bottom-0 left-0 w-full py-1 text-center"
          v-show="tipsShow">
          {{ tipsText }}
        </div>
      </Transition>
      <div class="transition-opacity" :class="tipsShow ? 'opacity-0' : 'block'">
        {{ footerText }}
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { ColItem } from '@/types';
import cursorInit from '@/utils/cursor';
import LinkBlock from '@cp/LinkBlock.vue';
import UserProfile from '@cp/UserProfile.vue';

const loaded = computed(() => configLoaded.value && backgroundLoad.value);
const configLoaded = ref(false);
const backgroundLoad = ref(false);
const links = ref<ColItem[]>([]);
const username = ref('');
const tipsText = ref('');
const tipsShow = ref(false);
const footerText = ref('');

watch(loaded, () => {
  if (loaded.value) {
    document.querySelector('#loading')?.classList.add('loaded');
    setTimeout(() => {
      document.querySelector('#loading')?.remove();
    }, 1000);
  }
});

onMounted(() => {
  cursorInit(document.getElementById('cursor-container') as HTMLElement);
  axios
    .get('./config.json')
    .then((res) => res.data)
    .then((data) => {
      document.title = data['username'];
      username.value = data['username'];
      const i = new Image();
      i.src = data['background'];
      i.onload = () => {
        backgroundLoad.value = true;
      };
      setTimeout(() => {
        backgroundLoad.value = true;
      }, 5000);
      document.body.style.setProperty(
        '--o-bg',
        'url(' + data['background'] + ')'
      );
      links.value = data['links'];
      footerText.value = data['footer'];
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      configLoaded.value = true;
    });
});

function handleTipsUpdate(show: boolean, text: string) {
  tipsShow.value = show;
  if (show) {
    tipsText.value = text;
  }
}
</script>

<style>
body {
  background-color: black;
  -webkit-font-smoothing: subpixel-antialiased;
  user-select: none;
  -webkit-user-drag: none;
}

#app {
  overflow: hidden;
}

/* Background */

.bg {
  background-image: var(--o-bg, black);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* No drag */

a,
img {
  -webkit-user-drag: none;
}

/* Loading */

.loaded {
  background: #00000000 !important;
  backdrop-filter: blur(0px) !important;
}

.loaded svg {
  display: none;
}

/* Cursor */

* {
  cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>")
      4 4,
    auto !important;
}

#cursor {
  position: fixed;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 25px;
  opacity: 0.25;
  z-index: 10086;
  pointer-events: none;
  transition: 0.2s ease-in-out;
  transition-property: background, opacity, transform;
}

#cursor.active {
  opacity: 0.5;
  transform: scale(0.5);
}

/* Transition */

.scale-x-enter-active,
.scale-x-leave-active {
  transition: all 0.3s ease;
}

.scale-x-enter-from,
.scale-x-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.main-show-enter-active {
  transition: all 1.5s ease;
}

.main-show-enter-from {
  transform: scale(1.1);
}

.bg-show-enter-active {
  transition: all 1.5s ease;
}

.bg-show-enter-from {
  transform: scale(1.3);
}
</style>
