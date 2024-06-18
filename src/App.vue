<template>
  <Transition name="bg-show">
    <div v-show="backgroundLoaded" class="bg fixed left-0 top-0 z-[-1] h-screen w-screen" />
  </Transition>
  <div class="z-10 flex min-h-screen w-full flex-col items-center justify-center text-white">
    <div v-show="backgroundLoaded" class="min-h-screen w-full overflow-hidden bg-black/40 transition-all duration-300 md:flex">
      <UserProfile
        avatar="/favicon.png"
        username="OriLight"
        github="https://github.com/orilights"
        telegram="https://t.me/OriLight"
        email="mailto:i@hk4e.com"
      />
      <div class="flex flex-1 items-center p-4 sm:px-10 sm:py-16">
        <div class="flex flex-col gap-4">
          <div>
            <Title title="站点" subtitle="Site" />
            <div class="flex flex-wrap gap-3">
              <WithStatus text="博客">
                <LinkBlock
                  title="自留地"
                  link="https://blog.amarea.cn/"
                />
              </WithStatus>
              <!-- <WithStatus text="寄了">
                <LinkBlock
                  title="文件仓库"
                  link="https://pan.amarea.cn/"
                />
              </WithStatus> -->
              <LinkBlock
                title="API"
                link="https://api.amarea.cn/"
              />
              <LinkBlock
                title="网站监控"
                link="https://go.amarea.cn/status"
              />
              <LinkBlock
                title="探针"
                link="https://go.amarea.cn/serverstatus"
              />
            </div>
          </div>
          <div>
            <Title title="项目" subtitle="Project" />
            <div class="flex flex-wrap gap-4">
              <ProjectBlock
                title="ServerStatus Theme Light"
                link="https://github.com/orilights/ServerStatus-Theme-Light"
                description="自制 ServerStatus 主题"
                background="https://icdn.amarea.cn/upload/2023/09/64f53791b3333.jpg"
              />
              <ProjectBlock
                title="PixivCollection"
                link="https://pixiv.orilight.top/"
                description="在线 Pixiv 收藏夹"
                background="https://icdn.amarea.cn/upload/2023/06/649a8efdb3e57.jpg"
              />
              <ProjectBlock
                title="米哈游官网新闻检索"
                link="https://news.hk4e.com/"
                description="米哈游旗下游戏的官网新闻检索工具"
                background="https://icdn.amarea.cn/upload/2023/06/649a560262b99.jpg"
              />
              <ProjectBlock
                title="汇率看板"
                link="https://exchange-board-dev.vercel.app/"
                description="自用汇率看板"
                background="https://icdn.amarea.cn/upload/2024/06/665a0f36b2f7d.png"
              />
              <ProjectBlock
                title="API Viewer"
                link="https://api-viewer.hk4e.com/"
                description="API记录查看工具，从2024/5/29开始记录"
                background="https://icdn.amarea.cn/upload/2023/06/649a560262b99.jpg"
              />
            </div>
          </div>
          <div>
            <Title title="在玩的游戏" subtitle="Playing" />
            <div class="flex flex-wrap gap-3">
              <WithStatus text="等纳塔">
                <TextBlock>
                  <img src="/icon/game/genshin.png" class="inline-block w-5 rounded">
                  原神
                </TextBlock>
              </WithStatus>
              <WithStatus text="等流萤">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/starrail.png" class="inline-block w-5 rounded">
                  星穹铁道
                </TextBlock>
              </WithStatus>
              <WithStatus text="全靠MAA">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/arknights.png" class="inline-block w-5 rounded">
                  明日方舟
                </TextBlock>
              </WithStatus>
              <WithStatus text="已退坑">
                <TextBlock class="flex items-center gap-2" :disabled="true">
                  <img src="/icon/game/bluearchive.png" class="inline-block w-5 rounded">
                  蔚蓝档案
                </TextBlock>
              </WithStatus>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const backgroundLoaded = ref(false)
const backgroundImage = 'https://api.amarea.cn/getbg/hp'

watch(backgroundLoaded, () => {
  if (backgroundLoaded.value) {
    document.querySelector('#loading')?.classList.add('loaded')
    setTimeout(() => {
      document.querySelector('#loading')?.remove()
    }, 1000)
  }
})

onMounted(() => {
  setTimeout(() => {
    backgroundLoaded.value = true
  }, 5000)
  const imgEl = new Image()
  imgEl.onload = () => {
    backgroundLoaded.value = true
    imgEl.remove()
  }
  imgEl.src = backgroundImage
  document.body.style.setProperty(
    '--o-bg',
      `url(${backgroundImage})`,
  )
})
</script>
