"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
    bullets: string[]
    onComplete: () => void
}

export default function Terminal({
    bullets,
    onComplete
}: Props) {
    const [lines, setLines] = useState<string[]>([])
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let currentIndex = 0

        const interval = setInterval(() => {
            if (currentIndex >= bullets.length) {
                clearInterval(interval)

                setTimeout(() => {
                    onComplete()
                }, 1000)

                return
            }

            setLines(previous => [
                ...previous,
                bullets[currentIndex]
            ])

            currentIndex++
        }, 80)

        return () => clearInterval(interval)
    }, [bullets, onComplete])

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop =
                terminalRef.current.scrollHeight
        }
    }, [lines])

    return (
        <div className="terminal-overlay">
            <div className="window">
                <div className="title-bar">
                    C:\WINDOWS\system32\cmd.exe
                </div>

                <div
                    className="terminal-body"
                    ref={terminalRef}
                >
                    <div>Microsoft Windows XP [Version 5.1.2600]</div>
                    <div>(C) Copyright 1985-2001 Microsoft Corp.</div>

                    <br />

                    <div>
                        C:\WINDOWS&gt; definitely_not_a_virus.exe
                    </div>

                    <br />

                    {lines.map((line, index) => (
                        <div key={index}>
                            {line || "\u00A0"}
                        </div>
                    ))}

                    <span className="terminal-cursor">█</span>
                </div>
            </div>
        </div>
    )
}