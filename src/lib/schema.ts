import { pgTable, text, timestamp, serial } from 'drizzle-orm/pg-core';

export const caseStudies = pgTable('case_studies', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    summary: text('summary'),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email'),
    message: text('message'),
    createdAt: timestamp('created_at').defaultNow(),
});
