"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const stages = [
  {
    emoji: "💡",
    title: "Idea",
    items: ["Concepts", "Mechanics", "Brainstorms"],
  },
  {
    emoji: "🎨",
    title: "Design",
    items: ["GDD", "Roadmap", "Tasks"],
  },
  {
    emoji: "🛠",
    title: "Prototype",
    items: ["Sprints", "Milestones", "Builds"],
  },
  {
    emoji: "🎮",
    title: "Playtest",
    items: ["Feedback", "Ratings", "Observations"],
  },
  {
    emoji: "🐞",
    title: "Iterate",
    items: ["Bugs", "Balance", "Priorities"],
  },
  {
    emoji: "🚀",
    title: "Ship",
    items: ["Checklist", "Patch Notes", "Version History"],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.1),transparent_38%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold text-orange-400">
              The full loop
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Build games.
              <br />
              <span className="text-white/45">Not spreadsheets.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">
              Every messy part of indie development, shaped into one connected
              workflow.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div
            className="pointer-events-none absolute top-0 hidden h-full w-[260px] rounded-[3rem] bg-orange-500/10 blur-3xl transition-all duration-700 ease-out xl:block"
            style={{
              left: `calc(${active} * (100% / 6))`,
            }}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {stages.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 70} className="h-full">
                <div
                  onMouseEnter={() => setActive(index)}
                  className="group relative flex h-full min-h-[300px] cursor-default flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 transition duration-500 hover:-translate-y-1 hover:border-orange-500/25 hover:bg-white/[0.05]"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-xl">
                    {stage.emoji}
                  </div>

                  <h3 className="text-xl font-medium">{stage.title}</h3>

                  <div className="mt-7 space-y-3">
                    {stage.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-black/30 px-3 py-2 text-sm text-white/55"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}