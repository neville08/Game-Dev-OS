"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      id="early-access"
      className="relative overflow-hidden bg-[#050505] px-6 py-40 text-white"
    >
      

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-6xl lg:text-[5.6rem] lg:leading-[1.02]">
            <span className="block text-white">
              Stop stitching tools together.
            </span>

            <span className="block bg-gradient-to-b from-white/60 to-white/28 bg-clip-text pb-3 text-transparent">
              Spend more time making games.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 text-lg text-white/55">
            Built by a Game Developer, for Game Developers.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <Link
            href="/preview"
            className="group mt-12 inline-flex h-16 items-center justify-center rounded-full bg-white px-12 text-xl font-semibold text-black shadow-[0_0_70px_rgba(249,115,22,0.2)] transition-all duration-300 hover:scale-[1.03] hover:bg-orange-50"
          >
            Start Building Better
            <ArrowRight
              className="ml-4 transition-transform duration-300 group-hover:translate-x-1"
              size={24}
              strokeWidth={2}
            />
          </Link>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-8 text-sm text-white/28">
            Free during beta • No credit card • Built by Neville Vincent
          </p>
        </Reveal>
      </div>
    </section>
  );
}