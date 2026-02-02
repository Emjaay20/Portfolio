import Hero from "@/components/Hero";
import CaseStudyList from "@/components/CaseStudyList";
import SystemsPhilosophy from "@/components/SystemsPhilosophy";
import Footer from "@/components/Footer";
import { logEvent } from "@/lib/analytics";

export default async function Home() {
  await logEvent('page_view', '/');
  return (
    <main className="min-h-screen bg-swiss-bg selection:bg-international-orange selection:text-white">
      <Hero />
      <CaseStudyList />
      <SystemsPhilosophy />
      {/* Blog section could go here later */}
      <Footer />
    </main>
  );
}
