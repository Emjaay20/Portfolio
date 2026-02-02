'use server';

import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';

export async function createBlogPost(formData: FormData) {
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
        try {
            const blob = await put(imageFile.name, imageFile, { access: 'public', addRandomSuffix: true });
            imageUrl = blob.url;
        } catch (error) {
            console.error('Blob upload failed:', error);
        }
    }

    const published = formData.get('published') === 'on';

    // generate slug
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    await db.insert(blogPosts).values({
        title,
        slug,
        excerpt,
        content,
        imageUrl,
        published,
    });

    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updateBlogPost(formData: FormData) {
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;
    const published = formData.get('published') === 'on';

    let imageUrl = undefined;
    if (imageFile && imageFile.size > 0) {
        try {
            const blob = await put(imageFile.name, imageFile, { access: 'public', addRandomSuffix: true });
            imageUrl = blob.url;
        } catch (error) {
            console.error('Blob upload failed:', error);
        }
    }

    const updateData: any = {
        title,
        excerpt,
        content,
        published,
    };

    if (imageUrl) {
        updateData.imageUrl = imageUrl;
    }

    await db.update(blogPosts)
        .set(updateData)
        .where(eq(blogPosts.id, id));

    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function deleteBlogPost(id: number) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidatePath('/admin/blog');
}
