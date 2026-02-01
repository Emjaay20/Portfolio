import { cookies } from 'next/headers';

export async function isAdmin() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('admin_secret')?.value;
    return cookie === process.env.ADMIN_SECRET;
}
