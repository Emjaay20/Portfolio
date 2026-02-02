"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

    const navItems = [
        { label: "Work", href: "/case-studies" },
        { label: "Writing", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-swiss-charcoal/5 bg-swiss-bg/80 backdrop-blur-md">
            <div className="flex items-center px-6 h-14 justify-between w-full max-w-screen-xl mx-auto">
                <Link href="/" className="flex items-center gap-4 hover:opacity-70 transition-opacity">
                    <h2 className="text-swiss-charcoal text-xs font-bold tracking-tight uppercase">
                        Yusuf Saka
                    </h2>
                    <span className="hidden sm:inline-block text-[10px] text-swiss-charcoal/40 font-mono tracking-wider uppercase">
                        — Product Engineer
                    </span>
                </Link>

                <div className="flex items-center gap-6 sm:gap-8">

                    <nav className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-swiss-charcoal hover:text-international-orange text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden sm:flex items-center gap-2 mr-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-international-orange animate-pulse" />
                        <span className="text-[10px] font-mono text-swiss-charcoal/60 uppercase tracking-wider">
                            ABJ {time}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
