"use client";

import { useState, useEffect } from "react";

export default function Header() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-swiss-charcoal/5 bg-swiss-bg/80 backdrop-blur-md">
            <div className="flex items-center px-6 h-14 justify-between w-full">
                <div className="flex items-center gap-4">
                    <h2 className="text-swiss-charcoal text-xs font-bold tracking-tight uppercase">
                        Yusuf Saka
                    </h2>
                    <span className="hidden sm:inline-block text-[10px] text-swiss-charcoal/40 font-mono tracking-wider uppercase">
                        — Product Engineer
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-international-orange animate-pulse" />
                        <span className="text-[10px] font-mono text-swiss-charcoal/60 uppercase tracking-wider">
                            LAG {time}
                        </span>
                    </div>
                    <a
                        href="#contact"
                        className="text-swiss-charcoal hover:text-international-orange text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </header>
    );
}
