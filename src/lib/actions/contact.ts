'use server';

import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { Resend } from 'resend';
import { headers } from 'next/headers';
import { and, eq, gt } from 'drizzle-orm';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(
    prevState: { success: boolean; error?: string },
    formData: FormData
) {
    try {
        const name = (formData.get('name') as string) || 'Anonymous';
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        const ip = (await headers()).get('x-forwarded-for') || 'unknown';
        const honeypot = formData.get('_gotcha');

        if (honeypot) {
            // calculated delay to trick bots
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { success: true };
        }

        if (!email || !message) {
            return { success: false, error: 'Email and message are required.' };
        }

        // Rate limiting: 1 submission per minute
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const recentSubmissions = await db
            .select()
            .from(contacts)
            .where(
                and(
                    eq(contacts.ipAddress, ip),
                    gt(contacts.createdAt, oneMinuteAgo)
                )
            );

        if (recentSubmissions.length > 0) {
            return { success: false, error: 'You are doing that too much. Please try again later.' };
        }

        await db.insert(contacts).values({
            name,
            email,
            message,
            ipAddress: ip,
        });

        // 2️⃣ Email YOU
        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL!,
            subject: `New Portfolio Message from ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // 3️⃣ Auto-reply to sender
        await resend.emails.send({
            from: 'Yusuf Saka <onboarding@resend.dev>',
            to: email,
            subject: 'Thanks for reaching out',
            html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I’ve received your message and I’ll get back to you shortly.</p>
        <p>— Yusuf</p>
      `,
        });

        const { logEvent } = await import('@/lib/analytics');
        await logEvent('contact_submit', '/contact');

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}
