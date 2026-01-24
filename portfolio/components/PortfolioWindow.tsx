// components/PortfolioWindow.tsx
"use client"

import { useState, useEffect } from "react"

type Experience = {
    role: string;
    company: string;
    period: string;
    contributions: string[];
};
type Publication = {
    title: string;
    venue: string;
    year: number;
    url: string;
};

type Contact = {
    label: string;
    url: string;
};

type Content = {
    introduction: {
        name: string;
        title: string;
        summary: string;
    };
    experience: Experience[];
    publications: Publication[];
    contact: Contact[];
};

interface PortfolioWindowProps {
    content: Content;
}

export default function PortfolioWindow({ content }: PortfolioWindowProps) {
    const [showBsod, setShowBsod] = useState(false);

    useEffect(() => {
        if (!showBsod) return;
        const timer = setTimeout(() => setShowBsod(false), 5000)
        return () => clearTimeout(timer)
    }, [showBsod])

    return (
        <>
            <main className="min-h-screen flex items-center justify-center">
                <article className="win-window w-full max-w-4xl">
                    <header className="win-title">
                        <span>{content.introduction.name}</span>
                        <button
                            className="win-close"
                            onClick={() => setShowBsod(true)}
                            aria-label="Close window"
                        >x</button>
                    </header>

                    <div className="win-content">
                        {/* 1. Introduction */}
                        <section>
                            <h2 className="font-bold">Software Engineer</h2>
                            <p>{content.introduction.summary}</p>
                        </section>

                        {/* 2. Experience */}
                        <section>
                            <h2>Works</h2>
                            {content.experience.map((exp, i) => (
                                <div key={i} className="mt-2">
                                    <strong>{exp.company}</strong> – {exp.role} ({exp.period})
                                    <ul className="list-disc ml-6">
                                        {exp.contributions.map((c, j) => (
                                            <li key={j}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        {/* 4. Publications */}
                        <section>
                            <h2>Publications</h2>
                            <ul className="list-disc ml-6">
                                {content.publications.map((pub, i) => (
                                    <li key={i}>
                                        <a
                                            href={pub.url}
                                            className="win-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {pub.title}
                                        </a> ({pub.venue}, {pub.year})
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* 5. Links */}
                        <div className="win-button-row">
                            {content.contact.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="win-button whitespace-nowrap text-sm"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </article>
            </main>

            {/* BSOD Overlay */}
            {showBsod && (
                <div className="bsod">
                    <p>A problem has been detected and Windows has been shut down.</p>
                    <br />
                    <p>
                        If this is the first time you've seen this stop error screen,
                        restart your computer. Restarting automatically in 5 seconds.
                    </p>
                    <br />
                    <p>
                        Technical information:
                        <br />
                        *** STOP: 0x0000001E (0xC0000005)
                    </p>
                </div>
            )}
        </>
    )
}
