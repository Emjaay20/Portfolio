import { createBlogPost } from '../actions';

export default function NewBlogPostPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Write New Blog Post</h1>

            <form action={createBlogPost} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full p-2 border rounded bg-background"
                        placeholder="e.g. The Future of AI in Design"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full p-2 border rounded bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Optional. Recommended size: 1200x630px.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <textarea
                        name="excerpt"
                        rows={3}
                        className="w-full p-2 border rounded bg-background"
                        placeholder="Short summary for the card view..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        name="content"
                        required
                        rows={15}
                        className="w-full p-2 border rounded bg-background font-mono text-sm"
                        placeholder="Write your article here (Markdown supported)..."
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="published"
                        id="published"
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
                        Create Post
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
