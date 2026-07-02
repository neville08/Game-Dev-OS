import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 pb-28 pt-36 text-white">
      {/* Ambient Glow Behind Headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.12) 35%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col items-center justify-center text-center">
        <Reveal>
          <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            Game Dev OS
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-10 text-5xl font-semibold tracking-[-0.055em] md:text-7xl lg:text-[7rem] lg:leading-[0.9]">
            <span className="block text-white">
              Build better games.
            </span>

            <span className="block bg-gradient-to-b from-white/60 to-white/28 bg-clip-text text-transparent">
              Without the chaos.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg">
            A premium workspace for indie teams to plan projects, track
            playtests, manage tasks, fix bugs, write design docs and work with
            AI.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#early-access"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-all duration-300 hover:scale-[1.02] hover:bg-orange-50"
            >
              Join Early Access
            </Link>

            <Link
              href="/preview"
              className="group inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] px-6 text-sm font-medium text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-orange-400/30 hover:bg-orange-500/10 hover:text-white"
            >
              Launch Preview

              <ArrowUpRight
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}