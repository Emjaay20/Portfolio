import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { blogPosts, caseStudies } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yusufsaka.com';

    const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, true));

    const cases = await db
        .select()
        .from(caseStudies)
        .where(eq(caseStudies.published, true));

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const caseUrls = cases.map((cs) => ({
        url: `${baseUrl}/case-studies/${cs.slug}`,
        lastModified: cs.createdAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/case-studies`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...postUrls,
        ...caseUrls,
    ];
}
