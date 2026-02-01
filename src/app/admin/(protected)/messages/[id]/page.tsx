import { DeleteMessageButton } from '@/components/delete-message-button';
import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MessageDetailPage({ params }: Props) {
    const { id } = await params;

    const messages = await db
        .select()
        .from(contacts)
        .where(eq(contacts.id, Number(id)));

    if (messages.length > 0 && !messages[0].read) {
        await db
            .update(contacts)
            .set({ read: true })
            .where(eq(contacts.id, Number(id)));
    }

    if (messages.length === 0) {
        notFound();
    }

    const message = messages[0];

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Message</h1>
                <p className="text-sm text-gray-500">
                    Received on {message.createdAt ? new Date(message.createdAt).toLocaleString() : 'N/A'}
                </p>
            </div>

            <div className="border rounded p-4 space-y-2 bg-white">
                <p>
                    <span className="font-semibold">From:</span> {message.name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span>{' '}
                    <a
                        href={`mailto:${message.email}`}
                        className="text-blue-600 underline"
                    >
                        {message.email}
                    </a>
                </p>
            </div>

            <div className="border rounded p-4 bg-white">
                <p className="whitespace-pre-wrap">{message.message}</p>
            </div>

            <DeleteMessageButton id={message.id} />
        </div>
    );
}
