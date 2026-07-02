import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Modules from "@/components/landing/Modules";
import Pipeline from "@/components/landing/Pipeline";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Modules />
      <Pipeline />
      <CTA />
      <Footer />
    </main>
  );
}