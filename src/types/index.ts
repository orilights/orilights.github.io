export interface ColItem {
  title: string;
  links: LinkItem[];
}

export interface LinkItem {
  title: string;
  link: string;
  tips?: string;
}

export interface PlaylistItem {
  name: string;
  artist: string;
  url: string;
  pic: string;
  lrc: string;
}