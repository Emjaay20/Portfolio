import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseStudyList from "@/components/CaseStudyList";
import SystemsPhilosophy from "@/components/SystemsPhilosophy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-swiss-bg selection:bg-international-orange selection:text-white">
      <Header />
      <Hero />
      <CaseStudyList />
      <SystemsPhilosophy />
      {/* Blog section could go here later */}
      <Footer />
    </main>
  );
}
