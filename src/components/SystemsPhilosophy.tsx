export default function SystemsPhilosophy() {
    return (
        <section className="py-24 px-6 bg-swiss-charcoal text-swiss-bg">
            <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <span className="block text-international-orange font-mono text-xs uppercase tracking-widest mb-6">
                                Engineering Philosophy
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[0.95] mb-8">
                                Complexity requires <br />
                                <span className="text-swiss-bg/50">clarity.</span>
                            </h2>
                        </div>

                        <div className="hidden lg:block">
                            <div className="w-16 h-16 border border-swiss-bg/20 rounded-full flex items-center justify-center animate-spin-slow">
                                <div className="w-2 h-2 bg-international-orange rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-12">
                        <div className="group">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-international-orange rounded-sm transition-transform group-hover:scale-150 rotate-45" />
                                Strategic Architecture
                            </h3>
                            <p className="text-swiss-bg/60 text-sm leading-relaxed max-w-md">
                                I don't just write code; I design systems. Every component is built with the assumption that requirements will evolve, scale will increase, and maintenance is forever.
                            </p>
                        </div>

                        <div className="group">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-swiss-bg/40 rounded-sm transition-transform group-hover:bg-international-orange group-hover:scale-150 rotate-45" />
                                Product Intuition
                            </h3>
                            <p className="text-swiss-bg/60 text-sm leading-relaxed max-w-md">
                                Engineering serves the product. I bridge the gap between technical constraints and user needs, ensuring that technical debt is a conscious investment, not an accident.
                            </p>
                        </div>

                        <div className="group">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-swiss-bg/40 rounded-sm transition-transform group-hover:bg-international-orange group-hover:scale-150 rotate-45" />
                                Research & Rigor
                            </h3>
                            <p className="text-swiss-bg/60 text-sm leading-relaxed max-w-md">
                                Deep dives into documentation, source code, and white papers. I prefer first-principles thinking over following trends, ensuring robustness in every layer of the stack.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
