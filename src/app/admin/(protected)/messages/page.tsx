import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { desc, count } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MessagesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const [totalMessages] = await db.select({ count: count() }).from(contacts);
    const totalPages = Math.ceil(totalMessages.count / pageSize);

    const messages = await db
        .select()
        .from(contacts)
        .orderBy(desc(contacts.createdAt))
        .limit(pageSize)
        .offset(offset);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Messages</h1>

            {messages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages found.</p>
            ) : (
                <>
                    <table className="w-full border text-sm mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Name</th>
                                <th className="border p-2 text-left">Email</th>
                                <th className="border p-2 text-left">Message</th>
                                <th className="border p-2 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((m) => (
                                <tr
                                    key={m.id}
                                    className={m.read ? 'bg-white' : 'bg-blue-50 font-semibold'}
                                >
                                    <td className="border p-2">{m.name}</td>
                                    <td className="border p-2">{m.email}</td>
                                    <td className="border px-3 py-2 max-w-sm truncate">
                                        <Link
                                            href={`/admin/messages/${m.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {m.message}
                                        </Link>
                                    </td>
                                    <td className="border p-2 text-xs">
                                        {m.createdAt
                                            ? new Date(m.createdAt).toLocaleString()
                                            : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center">
                        <Link
                            href={`/admin/messages?page=${page - 1}`}
                            className={`px-3 py-1 border rounded ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
                                }`}
                            aria-disabled={page <= 1}
                        >
                            Previous
                        </Link>
                        <span className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </span>
                        <Link
                            href={`/admin/messages?page=${page + 1}`}
                            className={`px-3 py-1 border rounded ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
                                }`}
                            aria-disabled={page >= totalPages}
                        >
                            Next
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
