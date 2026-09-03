"use client"

import { useEffect, useState } from "react"

export default function BSOD() {
    const [seconds, setSeconds] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(previous => {
                if (previous <= 1) {
                    clearInterval(interval)
                    return 0
                }

                return previous - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bsod">
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
                    Restarting in {seconds} second{seconds !== 1 ? "s" : ""}...
                </p>

                <p className="bsod-error">
                    STOP CODE: PORTFOLIO_SYSTEM_FAILURE
                </p>
            </div>
        </div>
    )
}