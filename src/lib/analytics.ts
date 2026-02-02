'use server';

import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function logEvent(type: string, path: string) {
    try {
        await db.execute(sql`
      INSERT INTO analytics_events (type, path)
      VALUES (${type}, ${path})
    `);
    } catch (e) {
        // Analytics must NEVER break the app
        console.error('Analytics error:', e);
    }
}
