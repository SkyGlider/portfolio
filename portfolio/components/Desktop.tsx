"use client"

import { useState } from "react"
import data from "@/content/desktop.json"
import DesktopIcon from "./DesktopIcon"
import Window from "./Window"
import { DesktopItem } from "@/types/DesktopItem"
import Terminal from "./Terminal"
import BSOD from "./BSOD"

const BASE_X = 300
const BASE_Y = 80
const OFFSET = 28

export default function Desktop() {
    const items = data.icons as DesktopItem[]
    const windows = items.filter(i => i.type === "window")
    const bugs = items.filter(i => i.type === "bug")
    const links = items.filter(i => i.type === "link")
    const defaultItem = items.find(i => i.id === "myself")


    const [openWindows, setOpenWindows] = useState<DesktopItem[]>([defaultItem!])
    const [showBSOD, setShowBSOD] = useState(false)
    const [isFlickering, setIsFlickering] = useState(false)
    const [activeBug, setActiveBug] = useState<DesktopItem | null>(null)

    const triggerBug = (item: DesktopItem) => {
        setActiveBug(item)
    }

    const triggerBSOD = () => {
        setIsFlickering(true)

        setTimeout(() => {
            setIsFlickering(false)
            setShowBSOD(true)

            setTimeout(() => {
                setShowBSOD(false)
            }, 5000)
        }, 2000)
    }

    const handleTerminalComplete = () => {
        setActiveBug(null)
        triggerBSOD()
    }

    const openWindow = (item: DesktopItem) => {
        if (item.type === "bug") {
            triggerBug(item)
        }
        if (item.type !== "window") return
        setOpenWindows(w => {
            const exists = w.find(x => x.id === item.id)
            if (exists) return bringToFront(item.id, w)
            return [...w, item]
        })
    }

    const closeWindow = (id: string) =>
        setOpenWindows(w => w.filter(x => x.id !== id))

    const bringToFront = (id: string, list = openWindows) => {
        const target = list.find(w => w.id === id)
        if (!target) return list
        return [...list.filter(w => w.id !== id), target]
    }

    return (
        <div className={`desktop ${isFlickering ? "screen-flicker" : ""}`}>
            {/* LEFT COLUMN – WINDOWS */}
            <div className="icons column windows-column">
                {windows.map(item => (
                    <DesktopIcon
                        key={item.id}
                        item={item}
                        onOpen={() => openWindow(item)}
                    />
                ))}
            </div>

            {/* RIGHT COLUMN – LINKS */}
            <div className="icons column links-column">
                {links.map(item => (
                    <DesktopIcon
                        key={item.id}
                        item={item}
                        onOpen={() => openWindow(item)}
                    />
                ))}
            </div>

            {/* BUGS */}
            <div className="icons column bugs-column">{
                bugs.map(item => (
                    <DesktopIcon
                        key={item.id}
                        item={item}
                        onOpen={() => openWindow(item)}
                    />
                ))}
            </div>


            {/* OPEN WINDOWS */}
            {openWindows.map((item, index) => (
                <Window
                    key={item.id}
                    title={item.window!.title}
                    content={item.window!}
                    onClose={() => closeWindow(item.id)}
                    onFocus={() =>
                        setOpenWindows(w => bringToFront(item.id, w))
                    }
                    style={{
                        top: BASE_Y + index * OFFSET,
                        left: BASE_X + index * OFFSET,
                        zIndex: 100 + index
                    }}
                />
            ))}

            {activeBug && (
                <Terminal bullets={activeBug.bullets ?? []} onComplete={handleTerminalComplete} />
            )}

            {showBSOD && <BSOD />}
        </div>
    )
}