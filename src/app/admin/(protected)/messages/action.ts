'use server';

import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function deleteMessage(formData: FormData) {
    const id = formData.get('id');

    if (!id) {
        throw new Error('Missing message ID');
    }

    await db.delete(contacts).where(eq(contacts.id, Number(id)));

    redirect('/admin/messages');
}
