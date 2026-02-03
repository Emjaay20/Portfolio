import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { contacts, blogPosts, caseStudies } from '@/lib/schema';
import { count, eq } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // 1. Fetch Stats
    const viewsResult = await db.execute(sql`SELECT COUNT(*) FROM analytics_events WHERE type = 'page_view'`);
    const totalViews = (viewsResult.rows[0] as { count: string }).count;

    const [unread] = await db.select({ count: count() }).from(contacts).where(eq(contacts.read, false));
    const [totalPosts] = await db.select({ count: count() }).from(blogPosts);
    const [totalCaseStudies] = await db.select({ count: count() }).from(caseStudies);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Welcome back. Here is an overview of your portfolio's performance.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white border rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Page Views</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{totalViews}</span>
                        <span className="text-xs text-green-500 font-medium">All time</span>
                    </div>
                </div>

                <div className="p-6 bg-white border rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Unread Messages</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{unread.count}</span>
                        {unread.count > 0 && (
                            <span className="text-xs text-orange-500 font-medium animate-pulse">Action needed</span>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-white border rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Blog Posts</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{totalPosts.count}</span>
                        <span className="text-xs text-gray-400">published</span>
                    </div>
                </div>

                <div className="p-6 bg-white border rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Case Studies</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{totalCaseStudies.count}</span>
                        <span className="text-xs text-gray-400">projects</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/blog/new"
                        className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition-all group"
                    >
                        <span className="font-semibold text-gray-600 group-hover:text-black">+ Write New Post</span>
                    </Link>
                    <Link
                        href="/admin/case-studies/new"
                        className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition-all group"
                    >
                        <span className="font-semibold text-gray-600 group-hover:text-black">+ Add Case Study</span>
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition-all group"
                    >
                        <span className="font-semibold text-gray-600 group-hover:text-black">Check Messages</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
