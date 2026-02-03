"use client";

import { useState } from "react";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    slug: string;
    role: string;
    year: string;
    description: string;
    tags: string[];
    image: string;
}

export default function CaseStudyList({ initialProjects }: { initialProjects: Project[] }) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Fallback if no specific projects passed (e.g. during development/transition)
    const projects = initialProjects && initialProjects.length > 0 ? initialProjects : [
        {
            id: "01",
            title: "FlowMeet",
            slug: "flowmeet",
            role: "Founding Engineer",
            year: "2024",
            description: "Automated meeting scheduling & lead routing infrastructure.",
            tags: ["Next.js", "Supabase"],
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop"
        },
        // ... (keep minimal fallback)
    ];

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
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/case-studies/${project.slug}`}
                            className="group relative border-t border-swiss-charcoal/10 py-12 block transition-all duration-500 hover:py-16"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Background Image on Hover */}
                            <div
                                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none"
                            >
                                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
                                <img
                                    src={project.image}
                                    alt=""
                                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 relative z-10 pointer-events-none">
                                <div className="flex items-baseline gap-6 md:w-1/3">
                                    <span className={`font-mono text-xs transition-colors duration-300 ${hoveredProject === project.id ? 'text-white/70' : 'text-international-orange opacity-0 group-hover:opacity-100'}`}>
                                        {project.id}
                                    </span>
                                    <h3
                                        className={`text-2xl transition-all duration-300 group-hover:translate-x-2 ${hoveredProject === project.id ? 'text-white font-black text-3xl md:text-4xl' : 'text-swiss-charcoal font-bold'}`}
                                    >
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="md:w-1/3">
                                    <p className={`text-sm mb-2 font-medium transition-colors duration-300 ${hoveredProject === project.id ? 'text-white/90' : 'text-swiss-charcoal/60'}`}>
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`text-[10px] uppercase tracking-wider font-mono transition-colors duration-300 ${hoveredProject === project.id ? 'text-white/60' : 'text-swiss-charcoal/40'}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end md:w-1/3 gap-1 text-right">
                                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${hoveredProject === project.id ? 'text-white' : 'text-swiss-charcoal'}`}>
                                        {project.role}
                                    </span>
                                    <span className={`font-mono text-xs transition-colors duration-300 ${hoveredProject === project.id ? 'text-white/60' : 'text-swiss-charcoal/40'}`}>
                                        {project.year}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className="border-t border-swiss-charcoal/10" />
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/case-studies"
                        className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-swiss-charcoal hover:text-international-orange transition-colors cursor-pointer"
                    >
                        View Archive
                        <span className="block w-4 h-[1px] bg-current transition-all group-hover:w-8" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
