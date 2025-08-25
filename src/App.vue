<script setup lang="ts">
interface Dict {
  [key: string]: string
}

interface ConfigDict {
  [key: string]: string | number
}

interface RecentActivity {
  date: string
  content: string
}

const backgroundLoaded = ref(false)
const backgroundImage = 'https://api.amarea.cn/getbg/hp'
const statusDict = ref<Dict>({
  'homepage.status.genshin': '',
  'homepage.status.starrail': '',
  'homepage.status.zzz': '',
  'homepage.status.arknights': '退坑',
  'homepage.status.bluearchive': '退坑',
})
const recentData = ref<RecentActivity[]>([])
const recentConfig = ref<ConfigDict>({
  max: 5,
})

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
  fetchRemoteConfig()
})

function fetchRemoteConfig() {
  const keys = Object.keys(statusDict.value).join(',')
  fetch(`https://api.amarea.cn/config/${keys}`)
    .then(res => res.json())
    .then((data: Dict) => {
      for (const key in data) {
        const value = data[key]
        if (value === null)
          continue
        statusDict.value[key] = value
      }
    })
  fetch(`https://api.amarea.cn/config/homepage.recent`)
    .then(res => res.json())
    .then((data: any) => {
      const content: string = data['homepage.recent'] || ''
      content.split('\n').forEach((line) => {
        if (line.trim()) {
          if (line.startsWith('#')) {
            const [configKey, configType, configValue] = line.replace('#', '').split(':')
            if (configType === 'number') {
              recentConfig.value[configKey] = Number(configValue)
            }
            else {
              recentConfig.value[configKey] = configValue
            }
            return
          }
          if (/\[\d+\.\d+\.\d+\]/.test(line)) {
            const date = line.match(/\[(.*)\]/)?.[1] || ''
            recentData.value.push({ date, content: '' })
          }
          else {
            recentData.value[recentData.value.length - 1].content += `${line.trim()}\n`
          }
        }
      })
    })
}

function t(key: string) {
  return statusDict.value[key]
}
</script>

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
              <LinkBlock
                title="个人项目"
                link="https://hk4e.com/"
              />
              <LinkBlock
                title="API"
                link="https://api.amarea.cn/"
              />
              <LinkBlock
                title="网站监控"
                link="https://go.amarea.cn/uptime"
              />
              <LinkBlock
                title="探针"
                link="https://go.amarea.cn/serverstatus"
              />
            </div>
          </div>
          <div>
            <Title title="在玩的游戏" subtitle="Playing" />
            <div class="flex flex-wrap gap-3">
              <WithStatus :text="t('homepage.status.genshin')">
                <TextBlock>
                  <img src="/icon/game/genshin.png" class="inline-block w-5 rounded">
                  原神
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.starrail')">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/starrail.png" class="inline-block w-5 rounded">
                  星穹铁道
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.zzz')">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/zzz.png" class="inline-block w-5 rounded">
                  绝区零
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.arknights')">
                <TextBlock class="flex items-center gap-2" :disabled="true">
                  <img src="/icon/game/arknights.png" class="inline-block w-5 rounded">
                  明日方舟
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.bluearchive')">
                <TextBlock class="flex items-center gap-2" :disabled="true">
                  <img src="/icon/game/bluearchive.png" class="inline-block w-5 rounded">
                  蔚蓝档案
                </TextBlock>
              </WithStatus>
            </div>
          </div>
          <div>
            <Title title="近期动态" subtitle="Recent" />
            <div class="flex flex-wrap gap-3">
              <TextBlock v-for="item in recentData.slice(0, Number(recentConfig.max))" :key="item.date" class="flex flex-col">
                <span class="text-xs text-gray-400">{{ item.date }}</span>
                <p class="whitespace-pre-line" v-html="item.content" />
              </TextBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
