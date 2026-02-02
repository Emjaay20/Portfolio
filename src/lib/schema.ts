import { pgTable, text, timestamp, serial, boolean } from 'drizzle-orm/pg-core';

export const caseStudies = pgTable('case_studies', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    summary: text('summary'),
    content: text('content'),
    imageUrl: text('image_url'),
    published: boolean('published').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email'),
    message: text('message'),
    ipAddress: text('ip_address'),
    read: boolean('read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});
export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    imageUrl: text('image_url'),
    published: boolean('published').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});
export const analytics_events = pgTable('analytics_events', {
    id: serial('id').primaryKey(),
    type: text('type').notNull(), // page_view | contact_submit
    path: text('path').notNull(), // /blog/my-post
    created_at: timestamp('created_at').defaultNow(),
});
