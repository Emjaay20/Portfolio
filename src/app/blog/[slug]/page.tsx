import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
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

    const result = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug));

    const post = result[0];

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} — Yusuf Saka`,
        description: post.excerpt || post.content.slice(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.slice(0, 160),
            type: 'article',
            publishedTime: post.createdAt ? post.createdAt.toISOString() : undefined,
            images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.content.slice(0, 160),
            images: post.imageUrl ? [post.imageUrl] : [],
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const result = await db
        .select()
        .from(blogPosts)
        .where(
            and(
                eq(blogPosts.slug, slug),
                eq(blogPosts.published, true)
            )
        );

    const post = result[0];

    if (!post) notFound();

    await logEvent('page_view', `/blog/${slug}`);

    return (
        <article className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-10 transition-colors group"
                >
                    <svg
                        className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Writing
                </Link>

                <header className="mb-10">
                    <div className="text-gray-400 text-sm mb-4">
                        {new Date(post.createdAt!).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                    {post.imageUrl && (
                        <div className="mb-10 rounded-2xl overflow-hidden border">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>
                    )}
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-gray-900">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-gray-600 leading-relaxed font-serif italic">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-p:leading-relaxed prose-p:text-gray-700 font-serif">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
