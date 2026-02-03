'use client';

import { deleteBlogPost } from '@/app/admin/(protected)/blog/actions';

export function DeletePostButton({ id }: { id: number }) {
    return (
        <form action={deleteBlogPost.bind(null, id)} className="inline">
            <button
                type="submit"
                className="text-sm text-red-500 hover:text-red-700"
                onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this post?')) {
                        e.preventDefault();
                    }
                }}
            >
                Delete
            </button>
        </form>
    );
}
