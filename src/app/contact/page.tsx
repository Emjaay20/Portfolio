'use client';

import { useActionState } from 'react';
import { submitContact } from '@/lib/actions/contact';

const initialState = {
    success: false,
    error: '',
};

export default function ContactPage() {
    const [state, action, isPending] = useActionState(submitContact, initialState);

    return (
        <div className="max-w-xl mx-auto px-6 py-24 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-8">Contact</h1>

            {state.success ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                    Thanks! Your message has been sent.
                </div>
            ) : null}

            {state.error ? (
                <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
                    {state.error}
                </div>
            ) : null}

            <form action={action} className="space-y-6">
                <input
                    name="name"
                    placeholder="Your name"
                    disabled={isPending}
                    className="w-full border border-black/20 p-3 disabled:opacity-50"
                />

                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email"
                    disabled={isPending}
                    className="w-full border border-black/20 p-3 disabled:opacity-50"
                />

                <textarea
                    name="message"
                    required
                    placeholder="Your message"
                    disabled={isPending}
                    className="w-full border border-black/20 p-3 h-32 disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white px-6 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Sending...' : 'Send message'}
                </button>
                <input
                    name="_gotcha"
                    type="text"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </form>
        </div>
    );
}
