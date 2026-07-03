"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "⌂", label: "Home", href: "/preview" },
  { icon: "▣", label: "Projects", href: "/preview/projects" },
  { icon: "◉", label: "Playtests", href: "/preview/playtests" },
  { icon: "✓", label: "Tasks", href: "/preview/tasks" },
  { icon: "!", label: "Bugs", href: "/preview/bugs" },
  { icon: "□", label: "Docs", href: "/preview/docs" },
  { icon: "↗", label: "Publishing", href: "/preview/publishing" },
  { icon: "✦", label: "AI Assistant", href: "/preview/ai" },
];

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

export default function DashboardPreview() {
  const pathname = usePathname();

  return (
    <section id="product" className="relative px-4 pb-24 md:px-8">
      <style>{`
        @keyframes progressRing {
          from { stroke-dashoffset: 314; }
          to { stroke-dashoffset: 100; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up {
          animation: fadeUp 0.8s ease-out both;
        }

        .progress-ring {
          animation: progressRing 1.4s ease-out forwards;
        }
      `}</style>

      <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-[460px] max-w-6xl rounded-full bg-orange-500/10 blur-3xl" />

      <div className="fade-up mx-auto w-full max-w-[1640px] rounded-[2.25rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-300 hover:border-orange-500/30">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F1115]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
              <p className="text-sm font-semibold text-white">Game Dev OS</p>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
              Studio Workspace
            </p>
          </div>

          <div className="grid min-h-[680px] md:grid-cols-[290px_1fr]">
            <aside className="hidden border-r border-white/10 bg-[#11151B] p-6 md:block">
              <p className="mb-8 text-xs uppercase tracking-[0.28em] text-gray-500">
                Workspace
              </p>

              <nav className="space-y-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${
                        isActive
                          ? "bg-orange-500/15 text-orange-400"
                          : "text-gray-400 hover:bg-orange-500/10 hover:text-orange-400"
                      }`}
                    >
                      <span className="w-5 text-center">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            <div className="p-6 md:p-10">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div>
                  <p className="text-sm text-gray-500">Current Project</p>
                  <h2 className="mt-1 text-5xl font-bold tracking-tight text-white">
                    MatterBreak
                  </h2>
                  <p className="mt-3 text-lg text-gray-400">
                    Local multiplayer arena prototype
                  </p>
                </div>

                <span className="w-fit rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-400">
                  Build v0.4.2
                </span>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
                <div className="rounded-3xl border border-white/10 bg-[#181C22] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#20252D] hover:shadow-xl hover:shadow-orange-500/5">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Current Milestone</p>
                      <h3 className="mt-2 text-3xl font-semibold text-white">
                        Capture System Polish
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                        Refining beacon control, material clarity, and player
                        feedback before the next LAN playtest.
                      </p>
                    </div>

                    <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
                      <svg className="h-44 w-44 -rotate-90">
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
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                          Progress
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-white/10 bg-[#20252D] p-4 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/10"
                      >
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                          {stat.icon}
                        </div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-white">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#181C22] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#20252D] hover:shadow-xl hover:shadow-orange-500/5">
                  <p className="text-sm text-gray-400">Project Health</p>
                  <p className="mt-4 text-5xl font-bold text-white">Stable</p>
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Weekly playtests active. Core capture loop is improving.
                  </p>

                  <div className="mt-8 space-y-3">
                    {["Weekly tests", "LAN prototype", "Material feedback"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-[#20252D] px-4 py-3 text-sm text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-300"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border border-white/10 bg-[#181C22] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#20252D] hover:shadow-xl hover:shadow-orange-500/5">
                  <p className="mb-4 text-sm font-medium text-gray-400">
                    Latest Playtest
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    Beacon Balance Test
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Materials were fun, but capture feedback needs clearer UI
                    and stronger player signals.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#181C22] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#20252D] hover:shadow-xl hover:shadow-orange-500/5">
                  <p className="mb-4 text-sm font-medium text-gray-400">
                    Recent Activity
                  </p>

                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-[#20252D] px-4 py-3 text-sm text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}