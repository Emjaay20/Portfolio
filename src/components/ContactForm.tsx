'use client';

import { useActionState } from 'react';
import { submitContact } from '@/lib/actions/contact';

const initialState = {
    success: false,
    error: '',
};

export default function ContactForm() {
    const [state, action, isPending] = useActionState(submitContact, initialState);

    return (
        <div className="w-full animate-fade-in-up">
            {state.success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md mb-6 text-sm">
                    Thanks! Your message has been sent. I'll get back to you shortly.
                </div>
            ) : null}

            {state.error ? (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-6 text-sm">
                    {state.error}
                </div>
            ) : null}

            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="hidden">
                        <input
                            name="_gotcha"
                            type="text"
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-swiss-charcoal/60">Name</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            disabled={isPending}
                            className="w-full bg-transparent border-b border-swiss-charcoal/20 py-2 text-swiss-charcoal placeholder:text-swiss-charcoal/30 focus:border-international-orange focus:outline-none transition-colors duration-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-swiss-charcoal/60">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="jane@example.com"
                            disabled={isPending}
                            className="w-full bg-transparent border-b border-swiss-charcoal/20 py-2 text-swiss-charcoal placeholder:text-swiss-charcoal/30 focus:border-international-orange focus:outline-none transition-colors duration-300"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-swiss-charcoal/60">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        disabled={isPending}
                        className="w-full bg-transparent border-b border-swiss-charcoal/20 py-2 text-swiss-charcoal placeholder:text-swiss-charcoal/30 focus:border-international-orange focus:outline-none transition-colors duration-300 min-h-[100px] resize-y"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-swiss-charcoal hover:text-international-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Sending...' : 'Send Message'}
                        <span className="block w-4 h-[1px] bg-current transition-all group-hover:w-8" />
                    </button>
                </div>
            </form>
        </div>
    );
}
