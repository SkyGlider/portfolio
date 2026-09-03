"use client"

import { useEffect, useState } from "react"

export default function BSOD() {
    const [seconds, setSeconds] = useState(7)
    const [partyMode, setPartyMode] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(previous => {
                if (previous <= 1) {
                    clearInterval(interval)
                    setPartyMode(true)
                    return 0
                }

                return previous - 1
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={`bsod ${partyMode ? "party-mode" : ""}`}>
            <div className="bsod-content">
                <h1>:(</h1>

                <p>
                    Your PC ran into a problem and needs to restart.
                </p>

                <p>
                    We're just collecting some error info, and then we'll restart for you.
                </p>

                <div className="bsod-progress">
                    <div className="bsod-progress-bar" />
                </div>

                <p>
                    A party is starting in {seconds} second{seconds !== 1 ? "s" : ""}...
                </p>

                <p className="bsod-error">
                    STOP CODE: 0xG0T_YA_ASS
                </p>
            </div>
        </div>
    )
}