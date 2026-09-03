export type WindowContent = {
    title: string
    summary?: string
    role?: string
    bullets?: string[]
}

export type DesktopItem = {
    id: string
    label: string
    icon: string
    shortcut?: boolean
    type: "window" | "link" | "bug"
    url?: string
    window?: WindowContent
    bullets?: string[]
}