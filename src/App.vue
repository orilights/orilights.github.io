<template>
  <Transition name="bg-show">
    <div v-show="backgroundLoaded" class="w-screen h-screen fixed top-0 left-0 z-[-1] bg" />
  </Transition>
  <div class="z-10 flex flex-col items-center justify-center w-full min-h-screen text-white">
    <div v-show="backgroundLoaded" class="w-full min-h-screen md:flex transition-all duration-300 bg-black/40 overflow-hidden">
      <UserProfile
        avatar="/favicon.png"
        username="OriLight"
        github="https://github.com/orilights"
        telegram="https://t.me/OriLight"
      />
      <div class="p-4 sm:px-10 sm:py-16 flex-1 flex items-center">
        <div class="flex flex-col gap-4">
          <div>
            <Title title="关于" subtitle="About" />
            <TextBlock>
              不知名双非软工在读，前端学习中
            </TextBlock>
          </div>
          <div>
            <Title title="站点" subtitle="Site" />
            <div class="flex flex-wrap gap-3">
              <WithStatus status="博客">
                <LinkBlock
                  title="自留地"
                  link="https://blog.amarea.cn/"
                />
              </WithStatus>
              <WithStatus status="暂时挂了">
                <LinkBlock
                  title="文件仓库"
                  link="https://pan.amarea.cn/"
                />
              </WithStatus>
              <WithStatus status="玩具API">
                <LinkBlock
                  title="API 服务"
                  link="https://api.amarea.cn/"
                />
              </WithStatus>
              <WithStatus status="希望服务器没逝🙏">
                <LinkBlock
                  title="服务状态监控"
                  link="https://go.amarea.cn/status"
                />
              </WithStatus>
            </div>
          </div>
          <div>
            <Title title="项目" subtitle="Project" />
            <div class="flex flex-wrap gap-4">
              <ProjectBlock
                title="PixivCollection"
                link="https://pixiv.orilight.top/"
                description="我的 Pixiv 收藏夹"
                background="https://icdn.amarea.cn/upload/2023/06/649a8efdb3e57.jpg"
              />
              <ProjectBlock
                title="原神官网新闻检索"
                link="https://genshin-news-search.vercel.app/"
                description="一个用于检索原神 CN 服务器官网新闻的小工具"
                background="https://icdn.amarea.cn/upload/2023/06/649a560262b99.jpg"
              />
            </div>
          </div>
          <div>
            <Title title="在玩的游戏" subtitle="Playing" />
            <div class="flex flex-wrap gap-3">
              <WithStatus status="等枫丹">
                <TextBlock>
                  <img src="/icon/genshin.png" class="inline-block w-5 rounded">
                  原神
                </TextBlock>
              </WithStatus>
              <WithStatus status="当番看">
                <TextBlock>
                  <img src="/icon/starrail.png" class="inline-block w-5 rounded">
                  崩坏：星穹铁道
                </TextBlock>
              </WithStatus>
              <WithStatus status="感觉不如MAA">
                <TextBlock>
                  <img src="/icon/arknights.png" class="inline-block w-5 rounded">
                  明日方舟
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
  try {
    const i = new Image()
    i.onload = () => {
      backgroundLoaded.value = true
    }
    i.src = backgroundImage
    document.body.style.setProperty(
      '--o-bg',
      `url(${backgroundImage})`,
    )
  }
  catch (e) {
    console.error(e)
  }
  finally {
    setTimeout(() => {
      backgroundLoaded.value = true
    }, 1000)
  }
})
</script>
