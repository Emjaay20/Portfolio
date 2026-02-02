'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [secret, setSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function login() {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/admin/login/action', {
                method: 'POST',
                body: JSON.stringify({ secret }),
            });

            if (res.ok) {
                router.push('/admin/messages');
            } else {
                setError('Invalid secret');
            }
        } catch (e) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border p-8 w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4">Admin Login</h1>

                {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

                <input
                    type="password"
                    placeholder="Admin secret"
                    aria-label="Admin secret"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    className="w-full border p-2 mb-4"
                    disabled={loading}
                />

                <button
                    onClick={login}
                    disabled={loading}
                    className="bg-black text-white w-full py-2 disabled:opacity-50"
                >
                    {loading ? 'Checking...' : 'Login'}
                </button>
            </div>
        </div>
    );
}
