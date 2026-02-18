export type WindowContent = {
    title: string
    summary: string
    bullets: string[]
}

export type DesktopItem = {
    id: string
    label: string
    icon: string
    shortcut?: boolean
    type: "window" | "link"
    url?: string
    window?: WindowContent
}