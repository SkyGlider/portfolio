import { WindowContent } from "@/types/DesktopItem"
import { CSSProperties } from "react"

type Props = {
    title: string
    content: WindowContent
    onClose: () => void
    onFocus: () => void
    style?: CSSProperties
}

export default function Window({ title, content, onClose, onFocus, style }: Props) {
    return (
        <div className="window" style={style}>
            <div className="title-bar" onMouseDown={onFocus}>
                <span>{title}</span>
                <button className="win-close"
                    onClick={onClose}>x</button>
            </div>

            <div className="window-body">
                {content.summary && <p>{content.summary}</p>}
                {content.role
                    ? <><strong>{"Role and Achievements: "}</strong><p>{content.role}</p></>
                    : <strong>{"I speacialise in:"}</strong>}
                {content.bullets && <ul>
                    {content.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                    ))}
                </ul>}
            </div>
        </div>
    )
}