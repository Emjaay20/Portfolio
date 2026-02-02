import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { updateBlogPost } from '../../actions';

export default async function EditBlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const blogPostId = parseInt(id);

    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, blogPostId));
    const post = result[0];

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

            <form action={updateBlogPost} className="space-y-6">
                <input type="hidden" name="id" value={post.id} />

                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={post.title}
                        required
                        className="w-full p-2 border rounded bg-background"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>
                    {post.imageUrl && (
                        <div className="mb-2">
                            <img
                                src={post.imageUrl}
                                alt="Current cover"
                                className="w-32 h-20 object-cover rounded border"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full p-2 border rounded bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Upload to replace existing image.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <textarea
                        name="excerpt"
                        rows={3}
                        defaultValue={post.excerpt || ''}
                        className="w-full p-2 border rounded bg-background"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        name="content"
                        required
                        rows={15}
                        defaultValue={post.content}
                        className="w-full p-2 border rounded bg-background font-mono text-sm"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="published"
                        id="published"
                        defaultChecked={post.published || false}
                        className="w-4 h-4"
                    />
                    <label htmlFor="published" className="text-sm font-medium">
                        Publish immediately
                    </label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity"
                    >
                        Update Post
                    </button>
                    <a
                        href="/admin/blog"
                        className="px-4 py-2 border rounded hover:bg-muted"
                    >
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    );
}
