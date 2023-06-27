export interface Profile {
  username: string
  github?: string
  telegram?: string
}
export interface ColItem {
  title: string
  subtitle?: string
  links: LinkItem[]
}

export interface LinkItem {
  title: string
  link: string
  tips?: string
}

export interface ProjectItem {
  title: string
  link: string
  tips?: string
  background: string
}

export interface PlaylistItem {
  name: string
  artist: string
  url: string
  pic: string
  lrc: string
}
