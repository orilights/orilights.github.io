export interface ColItem {
  title: string
  links: LinkItem[]
}

export interface ProfileData {
  username: string
  github?: string
  telegram?: string
}

export interface LinkItem {
  title: string
  link: string
  tips?: string
}

export interface WorkItem {
  title: string
  link: string
  background: string
}

export interface PlaylistItem {
  name: string
  artist: string
  url: string
  pic: string
  lrc: string
}
