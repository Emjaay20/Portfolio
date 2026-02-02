import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 px-6 min-h-[60vh] flex flex-col justify-center border-b border-swiss-charcoal/5">
            {/* Background Grid - applied via parent/global class but we can enhance here if needed */}
            <div className="absolute inset-0 technical-grid opacity-50 pointer-events-none" />

            <div className="relative max-w-screen-xl mx-auto w-full">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-swiss-charcoal/10 bg-white/50 backdrop-blur-sm mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-international-orange opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-international-orange"></span>
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-swiss-charcoal/80">
                            Available for new opportunities
                        </span>
                    </div>
                </div>

                <div className="max-w-4xl">
                    <h1 className="text-black tracking-tighter text-5xl sm:text-7xl font-bold leading-[0.9] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Product Engineering <br />
                        <span className="text-blue-900">Systems Research</span><br />
                        <span className="text-international-orange"> Software Architecture.</span>
                    </h1>

                    <div className="max-w-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <p className="text-swiss-charcoal/70 text-base sm:text-lg font-medium leading-relaxed mb-8">
                            I design and build secure, scalable, and interpretable systems combining
                            product strategy, software architecture, and research driven
                            engineering.
                        </p>

                        <div className="flex gap-4">
                            <Link
                                href="/case-studies"
                                className="px-6 py-3 bg-swiss-charcoal text-swiss-bg text-xs font-bold uppercase tracking-widest hover:bg-international-orange transition-colors duration-300"
                                aria-label="Scroll to view selected works"
                            >
                                View Selected Works
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
