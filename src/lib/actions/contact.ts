'use server';

import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(
    prevState: { success: boolean; error?: string },
    formData: FormData
) {
    try {
        const name = (formData.get('name') as string) || 'Anonymous';
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!email || !message) {
            return { success: false, error: 'Email and message are required.' };
        }

        // 1️⃣ Save to database (source of truth)
        await db.insert(contacts).values({
            name,
            email,
            message,
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

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}
