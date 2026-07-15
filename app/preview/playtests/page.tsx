"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const playtests = [
  {
    id: "#15",
    title: "LAN Balance Test",
    project: "MatterBreak",
    status: "Ready for Analysis",
    outcome: "Needs Review",
    build: "v0.4.2",
    date: "Saturday • 14:00",
    testers: "14",
    duration: "38 min",
    focus: "Beacon clarity, material balance and team fight readability.",
    lead: "Neville Vincent",
    accent: "amber",
    notes: [
      {
        name: "Neville Vincent",
        note: "Beacon VFX needs stronger feedback.",
      },
      {
        name: "Banuka Mendes",
        note: "Material respawn timing felt better.",
      },
      {
        name: "Jittiwat Chada",
        note: "UI states need clearer team ownership.",
      },
    ],
    scores: [
      { label: "Fun", value: "4.3" },
      { label: "Clarity", value: "3.1" },
      { label: "Balance", value: "3.8" },
    ],
  },
  {
    id: "#14",
    title: "Capture Flow Review",
    project: "MatterBreak",
    status: "AI Summary Ready",
    outcome: "Action Required",
    build: "v0.4.1",
    date: "Yesterday",
    testers: "9",
    duration: "31 min",
    focus: "Testing how quickly new players understand beacon control.",
    lead: "Banuka Mendes",
    accent: "red",
    notes: [
      {
        name: "Neville Vincent",
        note: "Players understood capture after round two.",
      },
      {
        name: "Banuka Mendes",
        note: "Spawn distance helped reduce early pressure.",
      },
      {
        name: "Jittiwat Chada",
        note: "Need better icon contrast in contested state.",
      },
    ],
    scores: [
      { label: "Fun", value: "4.0" },
      { label: "Clarity", value: "2.9" },
      { label: "Balance", value: "3.6" },
    ],
  },
  {
    id: "#13",
    title: "Material Feedback Test",
    project: "MatterBreak",
    status: "Archived",
    outcome: "Approved",
    build: "v0.3.9",
    date: "Last week",
    testers: "11",
    duration: "42 min",
    focus: "Checking if players understand material absorption and counters.",
    lead: "Jittiwat Chada",
    accent: "emerald",
    notes: [
      {
        name: "Neville Vincent",
        note: "Materials are fun but need stronger visuals.",
      },
      {
        name: "Banuka Mendes",
        note: "Cooldown readability needs improvement.",
      },
      {
        name: "Jittiwat Chada",
        note: "Counters should be introduced earlier.",
      },
    ],
    scores: [
      { label: "Fun", value: "4.5" },
      { label: "Clarity", value: "3.0" },
      { label: "Balance", value: "3.4" },
    ],
  },
];

type Playtest = (typeof playtests)[number];

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

function GlassPanel({ children, className = "" }: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const bounds = panel.getBoundingClientRect();

    panel.style.setProperty(
      "--panel-x",
      `${event.clientX - bounds.left}px`,
    );

    panel.style.setProperty(
      "--panel-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      className={`playtest-glass group/panel relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/20 hover:bg-white/[0.065] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.07), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl transition duration-700 group-hover/panel:scale-110 group-hover/panel:bg-orange-400/[0.1]" />

      <div className="playtest-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/panel:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function outcomeStyle(test: Playtest) {
  if (test.outcome === "Action Required") {
    return "border-red-400/20 bg-gradient-to-r from-red-500/18 via-red-400/[0.09] to-transparent text-red-200";
  }

  if (test.outcome === "Approved") {
    return "border-emerald-400/20 bg-gradient-to-r from-emerald-500/18 via-emerald-400/[0.09] to-transparent text-emerald-200";
  }

  return "border-amber-400/20 bg-gradient-to-r from-amber-500/18 via-orange-400/[0.09] to-transparent text-amber-200";
}

function statusStyle(status: string) {
  if (status === "Archived") {
    return "border-emerald-400/15 bg-emerald-500/10 text-emerald-200";
  }

  if (status === "AI Summary Ready") {
    return "border-violet-400/15 bg-violet-500/10 text-violet-200";
  }

  return "border-blue-400/15 bg-blue-500/10 text-blue-200";
}

function scoreGradient(label: string) {
  if (label === "Fun") {
    return "from-orange-500 via-amber-400 to-yellow-300";
  }

  if (label === "Clarity") {
    return "from-blue-500 via-cyan-400 to-sky-300";
  }

  return "from-violet-500 via-fuchsia-400 to-pink-300";
}

function cardGlow(test: Playtest) {
  if (test.accent === "red") {
    return "bg-red-500/[0.09]";
  }

  if (test.accent === "emerald") {
    return "bg-emerald-500/[0.08]";
  }

  return "bg-orange-500/[0.09]";
}

function PlaytestCard({
  test,
  index,
}: {
  test: Playtest;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();

    card.style.setProperty(
      "--card-x",
      `${event.clientX - bounds.left}px`,
    );

    card.style.setProperty(
      "--card-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="playtest-card playtest-fade-up group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/25 hover:bg-white/[0.065] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_110px_rgba(0,0,0,0.32)]"
      style={{
        animationDelay: `${160 + index * 90}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.075), transparent 64%)",
        }}
      />

      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full ${cardGlow(
          test,
        )} blur-[82px] transition-all duration-700 group-hover:scale-110`}
      />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="playtest-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.065] to-transparent opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-orange-300/15 bg-gradient-to-r from-orange-500/18 via-orange-400/[0.08] to-transparent px-3 py-1 text-xs font-semibold text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              Playtest {test.id}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${statusStyle(
                test.status,
              )}`}
            >
              {test.status}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${outcomeStyle(
                test,
              )}`}
            >
              {test.outcome}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="min-w-0">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {test.title}
              </h2>

              <p className="mt-2 text-sm text-white/35">
                {test.project} • {test.build} • {test.date}
              </p>
            </div>

            <span className="w-fit shrink-0 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/45 backdrop-blur-xl">
              Lead: {test.lead}
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/42">
            {test.focus}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Testers",
                value: test.testers,
              },
              {
                label: "Duration",
                value: test.duration,
              },
              {
                label: "Action Items",
                value: "4",
              },
            ].map((item) => (
              <GlassPanel
                key={item.label}
                className="min-h-[112px] rounded-[1.4rem] p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                  {item.label}
                </p>

                <p className="mt-3 text-2xl font-bold text-white">
                  {item.value}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>

        <GlassPanel className="rounded-[1.6rem] p-5">
          <p className="mb-5 text-xs uppercase tracking-[0.18em] text-white/25">
            Feedback Scores
          </p>

          <div className="space-y-5">
            {test.scores.map((score) => (
              <div key={score.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/58">{score.label}</span>

                  <span className="font-semibold text-white">
                    {score.value}/5
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.08] shadow-inner">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${scoreGradient(
                      score.label,
                    )} transition-all duration-1000`}
                    style={{
                      width: `${(Number(score.value) / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[1.4rem] border border-orange-300/15 bg-gradient-to-br from-orange-500/12 via-orange-400/[0.06] to-transparent p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-orange-400/[0.1] blur-2xl" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200/70">
                AI Summary
              </p>

              <p className="mt-2 text-sm leading-6 text-orange-50/72">
                Players enjoyed the material system, but beacon ownership and
                contested states need clearer feedback.
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="relative z-10 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[440px] group-hover:opacity-100">
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/25">
            Developer Notes
          </p>

          <div className="grid gap-3 md:grid-cols-3">
            {test.notes.map((note) => (
              <GlassPanel
                key={note.name}
                className="rounded-[1.4rem] p-4"
              >
                <p className="text-sm font-semibold text-white">{note.name}</p>

                <p className="mt-2 text-sm leading-6 text-white/38">
                  {note.note}
                </p>
              </GlassPanel>
            ))}
          </div>

          <button className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-[1.01] hover:bg-orange-50">
            Open Playtest Review
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PlaytestsPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <style>{`
            @keyframes playtestFadeUp {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes playtestSheen {
              from {
                transform: translateX(-20%) skewX(-18deg);
              }

              to {
                transform: translateX(340%) skewX(-18deg);
              }
            }

            @keyframes playtestStatPulse {
              0%, 100% {
                opacity: 0.72;
                transform: scale(1);
              }

              50% {
                opacity: 1;
                transform: scale(1.08);
              }
            }

            .playtest-fade-up {
              animation: playtestFadeUp 0.75s ease-out both;
            }

            .playtest-card:hover > .playtest-sheen,
            .playtest-glass:hover .playtest-sheen {
              animation: playtestSheen 1.15s ease-out both;
            }

            .playtest-stat-pulse {
              animation: playtestStatPulse 4.5s ease-in-out infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .playtest-fade-up,
              .playtest-card:hover > .playtest-sheen,
              .playtest-glass:hover .playtest-sheen,
              .playtest-stat-pulse {
                animation: none;
              }
            }
          `}</style>

          <div className="playtest-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-white/30">MatterBreak</p>

              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Playtests
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/42">
                Run weekly tests, collect structured feedback, capture developer
                notes and turn observations into tasks.
              </p>
            </div>

            <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
              New Playtest
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <div className="playtest-fade-up relative mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl [animation-delay:80ms]">
            <div className="playtest-stat-pulse pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-orange-500/[0.08] blur-3xl" />

            <div className="relative grid gap-4 xl:grid-cols-4">
              {[
                {
                  label: "Active Sessions",
                  value: "3",
                  detail: "Across MatterBreak",
                },
                {
                  label: "Total Testers",
                  value: "34",
                  detail: "Recent participation",
                },
                {
                  label: "Avg Fun Score",
                  value: "4.3",
                  detail: "Across recent tests",
                },
                {
                  label: "Open Actions",
                  value: "12",
                  detail: "Ready to convert",
                },
              ].map((stat) => (
                <GlassPanel
                  key={stat.label}
                  className="rounded-[1.45rem] p-5"
                >
                  <p className="text-sm text-white/35">{stat.label}</p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm text-white/30">{stat.detail}</p>
                </GlassPanel>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {playtests.map((test, index) => (
              <PlaytestCard
                key={test.id}
                test={test}
                index={index}
              />
            ))}
          </div>
        </PreviewShell>
      </div>
    </main>
  );
}