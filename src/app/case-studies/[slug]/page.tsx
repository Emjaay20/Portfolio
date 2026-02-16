import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { logEvent } from '@/lib/analytics';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const result = await db.execute(sql`
        SELECT title, summary, image_url
        FROM case_studies
        WHERE slug = ${slug}
    `);
    const results = result.rows as any[];
    const cs = results[0];

    if (!cs) {
        return {
            title: 'Case Study Not Found',
        };
    }

    return {
        title: `${cs.title} — Yusuf Saka`,
        description: cs.summary,
        openGraph: {
            title: cs.title,
            description: cs.summary,
            type: 'article',
            images: cs.image_url ? [{ url: cs.image_url }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: cs.title,
            description: cs.summary,
            images: cs.image_url ? [cs.image_url] : [],
        },
    };
}

export default async function CaseStudyDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const result = await db.execute(sql`
        SELECT title, content, summary, image_url, created_at
        FROM case_studies
        WHERE slug = ${slug} AND published = true
    `);
    const results = result.rows as any[];

    if (results.length === 0) notFound();

    const cs = results[0];

    await logEvent('page_view', `/case-studies/${slug}`);

    return (
        <article className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/case-studies"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
                >
                    <svg
                        className="mr-2 w-4 h-4 rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    Back to Case Studies
                </Link>

                <header className="mb-12">
                    {cs.image_url && (
                        <div className="mb-8 rounded-2xl overflow-hidden border">
                            <img
                                src={cs.image_url}
                                alt={cs.title}
                                className="w-full h-aut object-cover max-h-[500px]"
                            />
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                        {cs.title}
                    </h1>
                    {cs.summary && (
                        <p className="text-xl text-gray-600 leading-relaxed font-light">
                            {cs.summary}
                        </p>
                    )}
                    <div className="mt-6 text-sm text-gray-400">
                        Published on {new Date(cs.created_at).toLocaleDateString()}
                    </div>
                </header>

                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 font-sans text-gray-800 leading-relaxed">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{cs.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
