import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function BlogPage() {
    const posts = await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));

    return (
        <div className="container mx-auto px-4 py-16 md:py-24 animate-fade-in-up">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Writing</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Thoughts on software architecture, design patterns, and building specific products.
                    </p>
                </header>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.slug} className="group cursor-pointer">
                            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full bg-white border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-black/20">
                                <span className="text-sm text-gray-400 mb-2 block">
                                    {new Date(post.createdAt!).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                {post.imageUrl && (
                                    <div className="mb-4 rounded-lg overflow-hidden h-48 border">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                {post.excerpt && (
                                    <p className="text-gray-600 leading-relaxed text-lg mb-4">
                                        {post.excerpt}
                                    </p>
                                )}
                                <div className="mt-auto text-sm font-medium text-black group-hover:underline flex items-center">
                                    Read Article
                                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </Link>
                        </article>
                    ))}

                    {posts.length === 0 && (
                        <div className="py-20 text-center border-t border-b">
                            <p className="text-gray-500 italic">No articles published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
