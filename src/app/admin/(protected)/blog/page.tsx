import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { deleteBlogPost } from './actions';
import { DeletePostButton } from '@/components/admin-blog-delete-button';

export default async function BlogAdminPage() {
    // Fetch posts
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog / Research</h1>
                <a
                    href="/admin/blog/new"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
                >
                    + Write Post
                </a>
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-muted/30">
                                <td className="p-4 font-medium">{post.title}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${post.published
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground text-sm">
                                    {post.createdAt?.toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <a
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        View
                                    </a>
                                    <span className="text-muted-foreground">|</span>
                                    <a
                                        href={`/admin/blog/${post.id}/edit`}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        Edit
                                    </a>
                                    <span className="text-muted-foreground">|</span>
                                    <DeletePostButton id={post.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {posts.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No posts yet. Start writing!
                    </div>
                )}
            </div>
        </div>
    );
}
