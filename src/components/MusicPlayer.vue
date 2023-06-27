<template>
  <div
    class="box-border block overflow-hidden text-lg text-center transition-all duration-500 rounded-lg sm:flex-1 bg-black/40 backdrop-blur-md"
    :style="{
      height: listShow ? '316px' : '116px',
    }"
  >
    <div id="aplayer" class="py-2" />
  </div>
</template>

<script setup lang="ts">
import APlayer from 'aplayer'
import { getPlaylist } from '@/api'
import type { PlaylistItem } from '@/types'

const props = defineProps<{
  config: {
    server: string
    id: string
  }
}>()

const playlist = ref<PlaylistItem[]>([])
const listShow = ref(false)
let aplayerInstance: APlayer | null = null

watchEffect(() => {
  if (props.config.id === '')
    return
  getPlaylist(props.config.server, props.config.id)
    .then((res) => {
      playlist.value = (res.data as Array<PlaylistItem>).sort(
        // 打乱播放列表顺序
        () => Math.random() - 0.5,
      )
      if (!aplayerInstance)
        initAPlayer()
    })
    .catch((err) => {
      console.error('播放列表加载失败', err)
    })
})

function initAPlayer() {
  aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    listFolded: true,
    listMaxHeight: '180px',
    lrcType: 3,
    loop: 'all',
    volume: 0.3,
    audio: playlist.value,
  })
  aplayerInstance.on('listshow', () => {
    listShow.value = true
  })
  aplayerInstance.on('listhide', () => {
    listShow.value = false
  })
}

onBeforeUnmount(() => {
  aplayerInstance && aplayerInstance.destroy()
})
</script>
