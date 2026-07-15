import Navbar from "@/components/landing/Navbar";
import DashboardPreview from "@/components/landing/DashboardPreview";
import PreviewShell from "@/components/preview/PreviewShell";

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <DashboardPreview />
        </PreviewShell>
      </div>
    </main>
  );
}