
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export default async function AnalyticsPage() {
    const viewsResult = await db.execute(sql`
    SELECT COUNT(*) FROM analytics_events WHERE type = 'page_view'
  `);
    const views = viewsResult.rows[0] as { count: string };

    const contactsResult = await db.execute(sql`
    SELECT COUNT(*) FROM analytics_events WHERE type = 'contact_submit'
  `);
    const contacts = contactsResult.rows[0] as { count: string };

    const topPagesResult = await db.execute(sql`
    SELECT path, COUNT(*) as count
    FROM analytics_events
    WHERE type = 'page_view'
    GROUP BY path
    ORDER BY count DESC
    LIMIT 5
  `);
    const topPages = topPagesResult.rows as { path: string, count: string }[];

    return (
        <div className="space-y-10">
            <h1 className="text-2xl font-bold">Analytics</h1>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white border rounded">
                    <h2 className="text-sm text-gray-500">Total Page Views</h2>
                    <p className="text-3xl font-bold">{views.count}</p>
                </div>

                <div className="p-6 bg-white border rounded">
                    <h2 className="text-sm text-gray-500">Contact Submissions</h2>
                    <p className="text-3xl font-bold">{contacts.count}</p>
                </div>
            </div>

            <div>
                <h2 className="font-semibold mb-4">Top Pages</h2>
                <ul className="space-y-2 text-sm">
                    {topPages.map((p) => (
                        <li key={p.path} className="flex justify-between">
                            <span>{p.path}</span>
                            <span>{p.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
