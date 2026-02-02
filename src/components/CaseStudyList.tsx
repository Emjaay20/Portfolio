"use client";

import { useState } from "react";
import Link from "next/link";

const PROJECTS = [
    {
        id: "01",
        title: "FlowMeet",
        role: "Founding Engineer",
        year: "2024",
        description: "Automated meeting scheduling & lead routing infrastructure.",
        tags: ["Next.js", "Supabase", "System Architecture"],
    },
    {
        id: "02",
        title: "Nexus Theme",
        role: "Product Architect",
        year: "2023",
        description: "Hybrid WordPress/React framework for high-scale publishers.",
        tags: ["PHP", "React", "Core Web Vitals"],
    },
    {
        id: "03",
        title: "Identity Verifier",
        role: "System Designer",
        year: "2025",
        description: "Secure identity verification plugin with biometric checks.",
        tags: ["Security", "API Design", "Compliance"],
    },
];

export default function CaseStudyList() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <section className="py-24 px-6 border-b border-swiss-charcoal/5 bg-swiss-bg">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex items-end justify-between mb-16">
                    <h2 className="text-swiss-charcoal text-3xl font-bold tracking-tight">
                        Selected Works
                    </h2>
                    <span className="text-swiss-charcoal/40 font-mono text-xs uppercase tracking-widest hidden sm:block">
                        2023 — Present
                    </span>
                </div>

                <div className="flex flex-col">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="group relative border-t border-swiss-charcoal/10 py-12 transition-colors hover:bg-white/40"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 relative z-10">
                                <div className="flex items-baseline gap-6 md:w-1/3">
                                    <span className="font-mono text-xs text-international-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {project.id}
                                    </span>
                                    <h3 className="text-2xl font-bold text-swiss-charcoal transition-transform duration-300 group-hover:translate-x-2">
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="md:w-1/3">
                                    <p className="text-sm text-swiss-charcoal/60 mb-2 font-medium">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] uppercase tracking-wider text-swiss-charcoal/40 font-mono"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end md:w-1/3 gap-1 text-right">
                                    <span className="text-xs font-bold uppercase tracking-widest text-swiss-charcoal">
                                        {project.role}
                                    </span>
                                    <span className="font-mono text-xs text-swiss-charcoal/40">
                                        {project.year}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-swiss-charcoal/10" />
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/case-studies"
                        className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-swiss-charcoal hover:text-international-orange transition-colors"
                    >
                        View Archive
                        <span className="block w-4 h-[1px] bg-current transition-all group-hover:w-8" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
