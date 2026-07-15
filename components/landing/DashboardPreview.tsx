"use client";

import { MouseEvent, ReactNode, useRef } from "react";

const activity = [
  "Neville logged Playtest #12",
  "Beacon capture bug moved to In Progress",
  "Rubber material feedback marked High",
];

const stats = [
  { icon: "✓", label: "Open Tasks", value: "12" },
  { icon: "!", label: "High Issues", value: "3" },
  { icon: "◎", label: "Testers", value: "14" },
];

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
      className={`dashboard-glass group relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/25 hover:bg-white/[0.065] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_32px_100px_rgba(0,0,0,0.28)] ${className}`}
    >
      {/* Cursor-aware glass light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.075), transparent 62%)",
        }}
      />

      {/* Orange liquid refraction */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-400/[0.07] blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:bg-orange-400/[0.12]" />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.025] blur-3xl" />

      {/* Hover reflection sweep */}
      <div className="dashboard-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <section id="product" className="relative min-w-0">
      <style>{`
        @keyframes dashboardProgressRing {
          from {
            stroke-dashoffset: 314;
          }

          to {
            stroke-dashoffset: 100;
          }
        }

        @keyframes dashboardFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dashboardGlassSheen {
          from {
            transform: translateX(-20%) skewX(-18deg);
          }

          to {
            transform: translateX(340%) skewX(-18deg);
          }
        }

        @keyframes dashboardValueIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dashboard-fade-up {
          animation: dashboardFadeUp 0.75s ease-out both;
        }

        .dashboard-value-in {
          animation: dashboardValueIn 0.65s ease-out both;
        }

        .progress-ring {
          animation: dashboardProgressRing 1.4s ease-out forwards;
        }

        .dashboard-glass:hover .dashboard-sheen {
          animation: dashboardGlassSheen 1.15s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-fade-up,
          .dashboard-value-in,
          .progress-ring,
          .dashboard-glass:hover .dashboard-sheen {
            animation: none;
          }
        }
      `}</style>

      {/* Page heading */}
      <div className="dashboard-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <p className="text-sm text-white/30">Current Project</p>

          <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
            MatterBreak
          </h1>

          <p className="mt-3 text-lg text-white/42">
            Local multiplayer arena prototype
          </p>
        </div>

        <span className="w-fit rounded-full border border-orange-300/15 bg-gradient-to-r from-orange-500/15 via-orange-400/[0.09] to-orange-500/[0.04] px-4 py-2 text-sm font-semibold text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          Build v0.4.2
        </span>
      </div>

      {/* Main summary row */}
      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
        <GlassPanel className="dashboard-fade-up rounded-[2rem] p-7 [animation-delay:80ms]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-white/38">Current Milestone</p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Capture System Polish
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/38">
                Refining beacon control, material clarity, and player feedback
                before the next LAN playtest.
              </p>
            </div>

            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
              <div className="pointer-events-none absolute inset-4 rounded-full bg-orange-500/[0.08] blur-2xl" />

              <svg
                className="relative h-44 w-44 -rotate-90"
                aria-label="Project progress: 68 percent"
              >
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="14"
                />

                <circle
                  className="progress-ring"
                  cx="88"
                  cy="88"
                  r="70"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset="314"
                />
              </svg>

              <div className="absolute text-center">
                <p className="text-4xl font-bold text-white">68%</p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/28">
                  Progress
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group/stat relative overflow-hidden rounded-2xl border border-white/10 bg-black/[0.12] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-300/20 hover:bg-white/[0.055]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/[0.07] blur-2xl opacity-0 transition-opacity duration-300 group-hover/stat:opacity-100" />

                <div className="relative mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-orange-300/10 bg-orange-500/10 text-orange-300">
                  {stat.icon}
                </div>

                <p className="relative text-sm text-white/42">{stat.label}</p>

                <p
                  className="dashboard-value-in relative mt-2 text-3xl font-bold text-white"
                  style={{
                    animationDelay: `${220 + index * 80}ms`,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="dashboard-fade-up rounded-[2rem] p-7 [animation-delay:140ms]">
          <p className="text-sm text-white/38">Project Health</p>

          <p className="mt-4 bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text text-5xl font-bold text-transparent">
            Stable
          </p>

          <p className="mt-3 text-sm leading-6 text-white/38">
            Weekly playtests active. Core capture loop is improving.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                label: "Weekly tests",
                glow: "bg-emerald-500/10",
                dot: "bg-emerald-400",
              },
              {
                label: "LAN prototype",
                glow: "bg-blue-500/10",
                dot: "bg-blue-400",
              },
              {
                label: "Material feedback",
                glow: "bg-orange-500/10",
                dot: "bg-orange-400",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group/health relative overflow-hidden rounded-2xl border border-white/10 bg-black/[0.1] px-4 py-3 text-sm text-white/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-orange-300/20 hover:bg-white/[0.055] hover:text-orange-200"
              >
                <div
                  className={`pointer-events-none absolute inset-y-0 left-0 w-20 opacity-0 blur-xl transition-opacity duration-300 group-hover/health:opacity-100 ${item.glow}`}
                />

                <div className="relative flex items-center gap-3">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${item.dot}`}
                  />

                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Secondary row */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel className="dashboard-fade-up rounded-[2rem] p-7 [animation-delay:200ms]">
          <p className="mb-4 text-sm font-medium text-white/38">
            Latest Playtest
          </p>

          <h2 className="text-2xl font-semibold text-white">
            Beacon Balance Test
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/38">
            Materials were fun, but capture feedback needs clearer UI and
            stronger player signals.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-300/10 bg-gradient-to-r from-orange-500/15 via-orange-400/[0.08] to-transparent px-3 py-1 text-xs font-medium text-orange-200">
              Playtest #15
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
              14 testers
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
              Needs Review
            </span>
          </div>
        </GlassPanel>

        <GlassPanel className="dashboard-fade-up rounded-[2rem] p-7 [animation-delay:260ms]">
          <p className="mb-4 text-sm font-medium text-white/38">
            Recent Activity
          </p>

          <div className="space-y-3">
            {activity.map((item, index) => (
              <div
                key={item}
                className="group/activity relative overflow-hidden rounded-2xl border border-white/10 bg-black/[0.1] px-4 py-3 text-sm text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-orange-300/20 hover:bg-white/[0.055] hover:text-orange-200"
              >
                <div className="pointer-events-none absolute -left-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-orange-500/[0.07] blur-2xl opacity-0 transition-opacity duration-300 group-hover/activity:opacity-100" />

                <div className="relative flex items-center gap-3">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      index === 0
                        ? "bg-emerald-400"
                        : index === 1
                          ? "bg-orange-400"
                          : "bg-red-400"
                    }`}
                  />

                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}