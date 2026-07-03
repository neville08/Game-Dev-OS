import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

export default function BugsPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Bugs
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-white/45">
            Track reported issues, reproduce bugs, assign fixes and monitor
            progress across every project.
          </p>
        </PreviewShell>
      </div>
    </main>
  );
}