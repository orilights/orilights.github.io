<template>
  <Transition name="bg-show">
    <div v-show="loaded" class="w-screen h-screen fixed top-0 left-0 z-[-1] bg" />
  </Transition>
  <div class="z-10 flex flex-col items-center justify-center w-full min-h-screen text-white bg-black/20">
    <Transition name="main-show">
      <div v-show="loaded" class="w-full sm:w-[500px] min-h-screen sm:min-h-full pb-8 sm:pb-0 overflow-hidden bg-black/40 backdrop-blur-md sm:rounded-2xl">
        <UserProfile
          v-if="profile"
          :profile-data="profile"
          @tips-update="handleTipsUpdate"
        />
        <div class="p-6">
          <Transition name="fade">
            <div class="flex flex-col gap-4">
              <div v-for="col in links" :key="col.title">
                <div class="pb-3 text-xl font-bold rounded-lg w-fit">
                  {{ col.title }}<span v-if="col.subtitle" class="ml-1 text-sm">{{ col.subtitle }}</span>
                </div>
                <div class="flex flex-wrap justify-between gap-3">
                  <LinkBlock
                    v-for="item in col.links" :key="item.title"
                    :item-data="item"
                    @tips-update="handleTipsUpdate"
                  />
                </div>
              </div>
              <div v-if="projects.length">
                <div class="pb-3 text-xl font-bold rounded-lg w-fit">
                  项目<span class="ml-1 text-sm">Project</span>
                </div>
                <div class="flex flex-wrap justify-between gap-3">
                  <ProjectBlock
                    v-for="project in projects" :key="project.title"
                    :item-data="project"
                    @tips-update="handleTipsUpdate"
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
    <div id="cursor-container" class="absolute hidden md:block" />
    <footer
      v-show="loaded"
      class="fixed bottom-0 left-0 w-full py-1 overflow-hidden text-center bg-black/40 backdrop-blur"
    >
      <Transition name="scale-x">
        <div v-show="tipsShow" class="absolute bottom-0 left-0 w-full py-1 text-center">
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
import { getSiteConfig } from '@/api'
import type { ColItem, Profile, ProjectItem } from '@/types'
import cursorInit from '@/utils/cursor'

const configLoaded = ref(false)
const backgroundLoad = ref(false)
const loaded = computed(() => configLoaded.value && backgroundLoad.value)
const links = ref<ColItem[]>([])
const projects = ref<ProjectItem[]>([])
const profile = ref<Profile>()
const tipsText = ref('')
const tipsShow = ref(false)
const footerText = ref('')
const playlistConfig = ref({
  server: '',
  id: '',
})

watch(loaded, () => {
  if (loaded.value) {
    document.querySelector('#loading')?.classList.add('loaded')
    setTimeout(() => {
      document.querySelector('#loading')?.remove()
    }, 1000)
  }
})

onMounted(() => {
  cursorInit(document.getElementById('cursor-container') as HTMLElement)
  getSiteConfig()
    .then(res => res.data)
    .then((data) => {
      document.title = data.profile.username
      profile.value = data.profile
      playlistConfig.value = {
        server: data.playlist.server,
        id: data.playlist.id,
      }
      const i = new Image()
      i.src = data.background
      i.onload = () => {
        backgroundLoad.value = true
      }
      setTimeout(() => {
        backgroundLoad.value = true
      }, 5000)
      document.body.style.setProperty(
        '--o-bg',
        `url(${data.background})`,
      )
      links.value = data.links
      projects.value = data.projects
      footerText.value = data.footer
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      configLoaded.value = true
    })
})

function handleTipsUpdate(show: boolean, text?: string) {
  tipsShow.value = show
  if (show && text)
    tipsText.value = text
}
</script>
