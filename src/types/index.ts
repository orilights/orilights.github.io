export interface ColItem {
    title: string
    links: LinkItem[]
}

export interface LinkItem {
    title: string
    link: string
    tips?: string
}