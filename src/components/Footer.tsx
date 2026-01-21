export default function Footer() {
    return (
        <footer className="px-6 py-16 bg-swiss-bg">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
                <div>
                    <h2 className="text-swiss-charcoal text-3xl font-bold tracking-tight leading-none mb-2">
                        Build Resilient.
                    </h2>
                    <p className="text-swiss-charcoal/40 text-xs uppercase tracking-widest font-bold">
                        Product · Architecture · Research
                    </p>
                </div>

                <nav className="flex flex-col gap-4">
                    <a
                        className="flex items-center justify-between border-b border-swiss-charcoal/10 pb-4"
                        href="https://github.com/Emjaay20"
                        target="_blank"
                    >
                        <span className="text-sm font-bold uppercase tracking-widest">
                            GitHub
                        </span>
                    </a>
                    <a
                        className="flex items-center justify-between border-b border-swiss-charcoal/10 pb-4"
                        href="https://linkedin.com/in/yusuf-saka"
                        target="_blank"
                    >
                        <span className="text-sm font-bold uppercase tracking-widest">
                            LinkedIn
                        </span>
                    </a>
                </nav>

                <p className="text-swiss-charcoal/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                    © {new Date().getFullYear()} Yusuf Saka
                </p>
            </div>
        </footer>
    );
}
