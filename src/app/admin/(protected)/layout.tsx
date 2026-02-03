import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const secret = cookieStore.get('admin_secret')?.value;

    if (secret !== process.env.ADMIN_SECRET) {
        redirect('/admin/login');
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-6">
                <h2 className="font-bold text-lg mb-6">Admin</h2>

                <nav className="space-y-3 text-sm">
                    <Link href="/admin" className="block hover:underline">
                        Dashboard
                    </Link>
                    <Link href="/admin/messages" className="block hover:underline">
                        Messages
                    </Link>
                    <Link href="/admin/case-studies" className="block hover:underline">
                        Case Studies
                    </Link>
                    <Link href="/admin/blog" className="block hover:underline">
                        Blog
                    </Link>
                    <Link href="/admin/analytics" className="block hover:underline">
                        Analytics
                    </Link>
                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <a href="/admin/logout" className="block text-red-500 hover:text-red-700 hover:underline">
                            Logout
                        </a>
                    </div>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-10">{children}</main>
        </div>
    );
}
