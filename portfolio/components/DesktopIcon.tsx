import { DesktopItem } from "@/types/DesktopItem"

type Props = {
    item: DesktopItem
    onOpen: () => void
}

export default function DesktopIcon({ item, onOpen }: Props) {
    const handleDoubleClick = () => {
        if (item.type === "link" && item.url) {
            window.open(item.url, "_blank", "noopener,noreferrer")
        } else {
            onOpen()
        }
    }

    return (
        <div className="desktop-icon" onClick={handleDoubleClick}>
            <div className="icon-wrapper">
                <img src={item.icon} />
            </div>
            <span>{item.label}</span>
        </div>
    )
}