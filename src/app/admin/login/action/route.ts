import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const { secret } = await req.json();

        if (secret !== process.env.ADMIN_SECRET) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ success: true });

        response.cookies.set('admin_secret', secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax',
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}
