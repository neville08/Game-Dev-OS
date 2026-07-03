import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Docs
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-white/45">
            Game design documents, mechanics notes and project knowledge will
            live here.
          </p>
        </PreviewShell>
      </div>
    </main>
  );
}