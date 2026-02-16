import Hero from "@/components/Hero";
import CaseStudyList from "@/components/CaseStudyList";
import SystemsPhilosophy from "@/components/SystemsPhilosophy";
import ContactForm from "@/components/ContactForm";
import { logEvent } from "@/lib/analytics";
import { db } from '@/lib/db';
import { caseStudies } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await logEvent('page_view', '/');

  // Fetch latest 3 published case studies
  const projects = await db
    .select()
    .from(caseStudies)
    .where(eq(caseStudies.published, true))
    .orderBy(desc(caseStudies.createdAt))
    .limit(3);

  return (
    <main className="min-h-screen bg-swiss-bg selection:bg-international-orange selection:text-white">
      <Hero />
      <CaseStudyList initialProjects={projects.map((p, i) => ({
        id: String(i + 1).padStart(2, '0'),
        title: p.title,
        slug: p.slug,
        role: "Product Architect", // Default role since it's not in DB yet
        year: p.createdAt ? new Date(p.createdAt).getFullYear().toString() : new Date().getFullYear().toString(),
        description: p.summary || "",
        tags: ["Case Study"], // Default tags
        image: p.imageUrl || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop"
      }))} />
      <SystemsPhilosophy />
      <section className="py-24 px-6 border-b border-swiss-charcoal/5">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-swiss-charcoal tracking-tight mb-6">Let's Connect</h2>
            <p className="text-swiss-charcoal/70 leading-relaxed mb-8 max-w-sm">
              Interested in working together? Drop me a line/message and I'll get back to you as soon as possible.
            </p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
