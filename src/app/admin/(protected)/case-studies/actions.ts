'use server';

import { db } from '@/lib/db';
import { caseStudies } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';

export async function createCaseStudy(formData: FormData) {
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;
    let imageUrl = '';

    if (imageFile && imageFile.size > 0) {
        try {
            const blob = await put(imageFile.name, imageFile, { access: 'public', addRandomSuffix: true });
            imageUrl = blob.url;
        } catch (error) {
            console.error('Blob upload failed:', error);
            // If upload fails, we might want to throw or set a default error image
            // imageUrl = 'https://placehold.co/600x400?text=Upload+Failed';
        }
    }

    const published = formData.get('published') === 'on';

    // specific logic to generate slug
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    await db.insert(caseStudies).values({
        title,
        slug,
        summary,
        content,
        imageUrl,
        published,
    });

    revalidatePath('/admin/case-studies');
    revalidatePath('/case-studies');
    revalidatePath('/case-studies/[slug]', 'page');
    revalidatePath('/');
    redirect('/admin/case-studies');
}

export async function deleteCaseStudy(id: number) {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
    revalidatePath('/admin/case-studies');
    revalidatePath('/case-studies');
    revalidatePath('/case-studies/[slug]', 'page');
    revalidatePath('/');
}

export async function updateCaseStudy(formData: FormData) {
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
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
        summary,
        content,
        published,
    };

    if (imageUrl) {
        updateData.imageUrl = imageUrl;
    }

    await db.update(caseStudies)
        .set(updateData)
        .where(eq(caseStudies.id, id));

    revalidatePath('/admin/case-studies');
    revalidatePath('/case-studies');
    revalidatePath('/case-studies/[slug]', 'page');
    revalidatePath('/');
    redirect('/admin/case-studies');
}
