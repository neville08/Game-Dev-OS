import DashboardPreview from "@/components/landing/DashboardPreview";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <Hero />
        <DashboardPreview />
      </div>
    </main>
  );
}