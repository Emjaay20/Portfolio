import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import Link from 'next/link';
import { deleteCaseStudy } from './actions';

export default async function CaseStudiesAdminPage() {
    const result = await db.execute(sql`SELECT id, title, slug, published, created_at
     FROM case_studies
     ORDER BY created_at DESC`);
    const caseStudies = result.rows as any[];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Case Studies</h1>
                <Link
                    href="/admin/case-studies/new"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    New Case Study
                </Link>
            </div>

            {caseStudies.length === 0 ? (
                <p className="text-sm text-gray-500">No case studies yet.</p>
            ) : (
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">Title</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Created</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caseStudies.map((cs: any) => (
                            <tr key={cs.id}>
                                <td className="border p-2">{cs.title}</td>
                                <td className="border p-2">
                                    {cs.published ? 'Published' : 'Draft'}
                                </td>
                                <td className="border p-2 text-xs">
                                    {new Date(cs.created_at).toLocaleDateString()}
                                </td>
                                <td className="border p-2 space-x-2">
                                    <Link
                                        href={`/admin/case-studies/${cs.id}/edit`}
                                        className="text-blue-600 underline"
                                    >
                                        Edit
                                    </Link>
                                    <form action={async () => {
                                        'use server';
                                        await deleteCaseStudy(cs.id);
                                    }} className="inline">
                                        <button className="text-red-600 underline ml-2">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
