import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      id="early-access"
      className="relative overflow-hidden bg-[#050505] px-6 py-36 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(249,115,22,0.18),transparent_32%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-6xl lg:text-[5.4rem] lg:leading-[1.02]">
            <span className="block text-white">
              Stop stitching together tools.
            </span>
            <span className="block bg-gradient-to-b from-white/60 to-white/28 bg-clip-text pb-2 text-transparent">
              Spend more time making games.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/50">
            Built by a Game Developer, for Game Developers.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <Link
            href="/preview"
            className="group relative mt-12 inline-flex h-[60px] items-center justify-center overflow-hidden rounded-full bg-white px-10 text-lg font-semibold text-black shadow-[0_0_70px_rgba(249,115,22,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-50"
          >
            <span className="absolute inset-0 bg-orange-400/0 transition duration-500 group-hover:bg-orange-400/10" />

            <span className="relative flex items-center">
              Start Building Better
              <ArrowRight
                className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-6 text-sm text-white/35">
            Free during beta • No credit card • Built by Neville Vincent
          </p>
        </Reveal>
      </div>
    </section>
  );
}