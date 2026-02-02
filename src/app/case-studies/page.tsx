import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

export default async function CaseStudiesPage() {
    const result = await db.execute(sql`
        SELECT title, slug, summary, image_url, created_at
        FROM case_studies
        WHERE published = true
        ORDER BY created_at DESC
    `);
    const caseStudies = result.rows as any[];

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Case Studies</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Deep dives into recent projects and technical challenges.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                    {caseStudies.map((cs: any) => (
                        <Link
                            key={cs.slug}
                            href={`/case-studies/${cs.slug}`}
                            className="group block bg-white border rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-black/20 overflow-hidden"
                        >
                            {cs.image_url && (
                                <div className="h-48 w-full overflow-hidden border-b">
                                    <img
                                        src={cs.image_url}
                                        alt={cs.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col h-full p-6">
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                    {cs.title}
                                </h2>
                                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                    {cs.summary}
                                </p>
                                <div className="flex items-center text-sm font-medium text-black group-hover:translate-x-1 transition-transform">
                                    Read Case Study
                                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {caseStudies.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border border-dashed">
                            <p className="text-gray-500 text-lg">Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
