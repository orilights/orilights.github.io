interface APlayerOptions {
    container?: HTMLElement | null
    fixed?: boolean
    mini?: boolean
    autoplay?: boolean
    theme?: string
    loop?: "all" | "one" | "none"
    order?: "list" | "random"
    preload?: "none" | "metadata" | "auto"
    volume?: number
    mutex?: boolean
    listFolded?: boolean
    listMaxHeight?: String
    lrcType?: number
    audio?: any
    storageName?: string
    customAudioType?: Record<string, void>
    customInit?: (player: any, src: APlayerOptions) => Promise<any>
}

interface Audio {
    name: string
    url: string
    artist?: string
    cover?: string
    lrc?: string
    theme?: string
    type?: string
    customAudioType?: Record<string, void>
}

declare module 'aplayer' {
    export default class {
        events: any
        audio: HTMLAudioElement
        fullScreen: FullScreen
        constructor(options: APlayerOptions)
        play(): void
        pause(): void
        seek(time: number): void
        toggle(): void
        on(event: string, handler: () => void): void
        volume(percentage: number, nostorage: boolean, nonotice: boolean): void
        theme(color: string, index: number): void
        setMode(mode: "normal" | "mini"): void
        mode(): string
        notice(text: string, time?: number, opacity?: number): void
        skipBack(): void
        skipForward(): void
        destroy(): void
        lrc: {
            show(): void
            hide(): void
            toggle(): void
        }
        list: {
            show(): void
            hide(): void
            toggle(): void
            add(audios: Array<Audio> | Audio): void
            remove(index: number): void
            switch(index: number): void
        }
    }
}
