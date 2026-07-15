"use client";

import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const currentUser = "Neville Vincent";

const bugs = [
  {
    id: "BUG-018",
    title: "Beacon contested state shows the wrong team colour",
    status: "In Progress",
    severity: "Critical",
    category: "UI / Replication",
    assignee: "Neville Vincent",
    reporter: "Jittiwat Chada",
    build: "v0.4.2",
    platform: "Windows · LAN",
    reproduction: "Always",
    source: "Playtest #15",
    updated: "20 minutes ago",
    blocked: false,
    description:
      "The contested beacon indicator occasionally uses the local team colour instead of the opposing team colour on the client.",
  },
  {
    id: "BUG-017",
    title: "Client knockback is delayed when firing at the host",
    status: "Review",
    severity: "High",
    category: "Network / Combat",
    assignee: "Banuka Mendes",
    reporter: "Neville Vincent",
    build: "v0.4.2",
    platform: "Windows · LAN",
    reproduction: "Frequent",
    source: "Playtest #15",
    updated: "1 hour ago",
    blocked: false,
    description:
      "The host receives knockback correctly, but the movement appears late on the firing client's screen.",
  },
  {
    id: "BUG-016",
    title: "Material pickup remains visible after absorption",
    status: "Backlog",
    severity: "Medium",
    category: "Gameplay",
    assignee: "Jittiwat Chada",
    reporter: "Banuka Mendes",
    build: "v0.4.1",
    platform: "Windows",
    reproduction: "Sometimes",
    source: "Playtest #14",
    updated: "Yesterday",
    blocked: false,
    description:
      "The material state updates correctly, but the world mesh occasionally remains visible until the respawn timer completes.",
  },
  {
    id: "BUG-015",
    title: "Second LAN player spawns with a white team material",
    status: "In Progress",
    severity: "High",
    category: "Visuals / Network",
    assignee: "Neville Vincent",
    reporter: "Neville Vincent",
    build: "v0.4.1",
    platform: "Windows · LAN",
    reproduction: "Frequent",
    source: "Bug Bash",
    updated: "Yesterday",
    blocked: true,
    description:
      "The second player briefly appears white before the client-specific team visual is applied.",
  },
  {
    id: "BUG-014",
    title: "Pulse charge text remains at 10 after firing",
    status: "Resolved",
    severity: "Medium",
    category: "UI",
    assignee: "Neville Vincent",
    reporter: "Banuka Mendes",
    build: "v0.4.0",
    platform: "Windows",
    reproduction: "Fixed",
    source: "Sprint 4",
    updated: "3 days ago",
    blocked: false,
    description:
      "The underlying charge value changed correctly, but the HUD refresh happened before the ability state finished updating.",
  },
  {
    id: "BUG-013",
    title: "Player launches downward after respawning",
    status: "Resolved",
    severity: "Critical",
    category: "Respawn",
    assignee: "Banuka Mendes",
    reporter: "Jittiwat Chada",
    build: "v0.3.9",
    platform: "Windows · LAN",
    reproduction: "Fixed",
    source: "Playtest #13",
    updated: "Last week",
    blocked: false,
    description:
      "A velocity reset in the respawn sequence forced the character downward immediately after spawning.",
  },
];

const views = [
  "All Issues",
  "Assigned to Me",
  "Critical",
  "Blocked",
  "Resolved",
];

const statuses = ["Backlog", "In Progress", "Review", "Resolved"];

function getFilteredBugs(view: string) {
  if (view === "Assigned to Me") {
    return bugs.filter((bug) => bug.assignee === currentUser);
  }

  if (view === "Critical") {
    return bugs.filter((bug) => bug.severity === "Critical");
  }

  if (view === "Blocked") {
    return bugs.filter((bug) => bug.blocked);
  }

  if (view === "Resolved") {
    return bugs.filter((bug) => bug.status === "Resolved");
  }

  return bugs;
}

function severityStyle(severity: string) {
  if (severity === "Critical") {
    return "border-red-400/20 bg-red-500/10 text-red-200";
  }

  if (severity === "High") {
    return "border-orange-400/20 bg-orange-500/10 text-orange-200";
  }

  return "border-amber-400/20 bg-amber-500/10 text-amber-200";
}

function statusStyle(status: string) {
  if (status === "Resolved") {
    return "border-emerald-400/15 bg-emerald-500/10 text-emerald-200";
  }

  if (status === "Review") {
    return "border-blue-400/15 bg-blue-500/10 text-blue-200";
  }

  if (status === "In Progress") {
    return "border-orange-400/15 bg-orange-500/10 text-orange-200";
  }

  return "border-white/10 bg-white/[0.06] text-white/55";
}

function BugCard({ bug }: { bug: (typeof bugs)[number] }) {
  const cardRef = useRef<HTMLElement>(null);

  function handleCardMouseMove(event: MouseEvent<HTMLElement>) {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    card.style.setProperty("--card-x", `${x}px`);
    card.style.setProperty("--card-y", `${y}px`);
  }

  return (
    <Link
      href={`/preview/bugs/${bug.id}`}
      aria-label={`Open report for ${bug.id}: ${bug.title}`}
      className="block min-w-0 rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F1115]"
    >
      <article
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        className="bug-card group relative flex h-[570px] min-w-0 cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/25 hover:bg-white/[0.065] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_32px_100px_rgba(0,0,0,0.3)]"
      >
        {/* Cursor-aware internal glass light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.075), transparent 62%)",
          }}
        />

        {/* Orange refraction */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-400/[0.08] blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:bg-orange-400/[0.13]" />

        <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.035] blur-3xl" />

        {/* Premium reflection sweep */}
        <div className="bug-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.065] to-transparent opacity-0 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full min-w-0 flex-col">
          <div className="mb-5 flex h-[58px] items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold tracking-[0.16em] text-white/30">
                {bug.id}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl ${statusStyle(
                  bug.status,
                )}`}
              >
                {bug.status}
              </span>
            </div>

            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl ${severityStyle(
                bug.severity,
              )}`}
            >
              {bug.severity}
            </span>
          </div>

          <h3 className="h-[66px] overflow-hidden text-lg font-semibold leading-snug tracking-tight text-white">
            {bug.title}
          </h3>

          <p className="mt-4 h-[108px] overflow-hidden text-sm leading-6 text-white/42">
            {bug.description}
          </p>

          <div className="mt-5 grid h-[92px] min-w-0 grid-cols-[0.8fr_1.2fr] gap-3">
            <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-black/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-white/25">
                Build
              </p>

              <p className="whitespace-nowrap text-sm font-medium text-white/70">
                {bug.build}
              </p>
            </div>

            <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-black/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <p className="whitespace-nowrap text-[9px] uppercase tracking-[0.05em] text-white/25 min-[1500px]:text-[10px]">
                Reproduction
              </p>

              <p className="whitespace-nowrap text-sm font-medium text-white/70">
                {bug.reproduction}
              </p>
            </div>
          </div>

          <div className="mt-3 h-[72px] min-w-0 rounded-2xl border border-white/10 bg-black/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
            <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-white/25">
              Platform
            </p>

            <p className="mt-2 whitespace-nowrap text-sm font-medium text-white/70">
              {bug.platform}
            </p>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="space-y-2">
              <div className="flex h-[42px] items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-black/[0.08] px-3">
                <p className="shrink-0 text-[9px] uppercase tracking-[0.1em] text-white/25">
                  Assigned
                </p>

                <p className="whitespace-nowrap text-right text-xs font-medium text-white/70 min-[1500px]:text-sm">
                  {bug.assignee}
                </p>
              </div>

              <div className="flex h-[42px] items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-black/[0.08] px-3">
                <p className="shrink-0 text-[9px] uppercase tracking-[0.1em] text-white/25">
                  Reporter
                </p>

                <p className="whitespace-nowrap text-right text-xs font-medium text-white/70 min-[1500px]:text-sm">
                  {bug.reporter}
                </p>
              </div>
            </div>

            <div className="mt-3 flex h-[28px] min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 truncate rounded-full border border-orange-400/10 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-200/90 backdrop-blur-xl">
                {bug.source}
              </span>

              {bug.blocked && (
                <span className="shrink-0 rounded-full border border-red-400/15 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-xl">
                  Blocked
                </span>
              )}
            </div>

            <div className="mt-3 flex h-[18px] items-center justify-between gap-3">
              <p className="whitespace-nowrap text-[11px] text-white/25">
                Updated {bug.updated}
              </p>

              <span className="whitespace-nowrap text-xs font-medium text-orange-200/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-200/80">
                Open report →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BugsPage() {
  const [activeView, setActiveView] = useState("All Issues");
  const pageRef = useRef<HTMLElement>(null);

  const filteredBugs = getFilteredBugs(activeView);

  const openIssues = bugs.filter((bug) => bug.status !== "Resolved").length;

  const criticalIssues = bugs.filter(
    (bug) => bug.severity === "Critical" && bug.status !== "Resolved",
  ).length;

  const assignedToMe = bugs.filter(
    (bug) => bug.assignee === currentUser && bug.status !== "Resolved",
  ).length;

  const blockedIssues = bugs.filter((bug) => bug.blocked).length;

  function handlePageMouseMove(event: MouseEvent<HTMLElement>) {
    const page = pageRef.current;

    if (!page) {
      return;
    }

    page.style.setProperty("--mouse-x", `${event.clientX}px`);
    page.style.setProperty("--mouse-y", `${event.clientY}px`);
  }

  return (
    <main
      ref={pageRef}
      onMouseMove={handlePageMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#0F1115] text-white"
    >
      <style>{`
        @keyframes bugFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bugTabIn {
          from {
            transform: scaleX(0.35);
            opacity: 0;
          }

          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes liquidDriftOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-24px, 18px, 0) scale(1.1);
          }
        }

        @keyframes liquidDriftTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(28px, -20px, 0) scale(1.08);
          }
        }

        @keyframes glassSheen {
          from {
            transform: translateX(-20%) skewX(-18deg);
          }

          to {
            transform: translateX(340%) skewX(-18deg);
          }
        }

        .bug-fade-up {
          animation: bugFadeUp 0.7s ease-out both;
        }

        .bug-tab-in {
          animation: bugTabIn 0.35s ease-out both;
        }

        .liquid-drift-one {
          animation: liquidDriftOne 11s ease-in-out infinite;
        }

        .liquid-drift-two {
          animation: liquidDriftTwo 14s ease-in-out infinite;
        }

        .bug-card:hover .bug-sheen {
          animation: glassSheen 1.15s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .bug-fade-up,
          .bug-tab-in,
          .liquid-drift-one,
          .liquid-drift-two,
          .bug-card:hover .bug-sheen {
            animation: none;
          }
        }
      `}</style>

      {/* Reactive Raycast-style background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0F1115]" />

        <div
          className="absolute inset-0 opacity-90 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(620px circle at var(--mouse-x, 65vw) var(--mouse-y, 35vh), rgba(249,115,22,0.13), transparent 66%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(380px circle at var(--mouse-x, 65vw) var(--mouse-y, 35vh), rgba(255,255,255,0.045), transparent 72%)",
          }}
        />

        <div className="liquid-drift-one absolute -right-48 top-[12%] h-[560px] w-[560px] rounded-full bg-orange-500/[0.08] blur-[130px]" />

        <div className="liquid-drift-two absolute -left-56 top-[48%] h-[520px] w-[520px] rounded-full bg-orange-900/[0.07] blur-[150px]" />

        <div className="absolute bottom-[-220px] left-[38%] h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="pt-24">
          <PreviewShell>
            <div className="bug-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <p className="text-sm text-white/35">MatterBreak</p>

                <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                  Bugs
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-white/45">
                  Capture issues, reproduce them clearly and keep every fix tied
                  to the build and playtest where it was discovered.
                </p>
              </div>

              <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
                Report Bug
                <span className="text-lg leading-none">+</span>
              </button>
            </div>

            <div className="bug-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl [animation-delay:80ms]">
              <div className="liquid-drift-one pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.08] blur-3xl" />

              <div className="relative grid gap-2 lg:grid-cols-5">
                {views.map((view) => {
                  const active = activeView === view;

                  return (
                    <button
                      key={view}
                      onClick={() => setActiveView(view)}
                      className={`relative rounded-[1.5rem] border px-5 py-4 text-center transition-all duration-300 ${
                        active
                          ? "border-white/15 bg-white/[0.09] text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                          : "border-transparent text-white/45 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <p className="text-sm font-semibold">{view}</p>

                      {active && (
                        <div className="bug-tab-in absolute inset-x-5 -bottom-2 h-px origin-center bg-orange-300 shadow-[0_0_20px_rgba(251,146,60,0.72)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bug-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl [animation-delay:140ms]">
              <div className="liquid-drift-two pointer-events-none absolute -right-10 top-2 h-52 w-52 rounded-full bg-red-400/[0.07] blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-orange-400/[0.05] blur-3xl" />

              <div className="relative grid gap-4 xl:grid-cols-4">
                {[
                  {
                    label: "Open Issues",
                    value: openIssues,
                    detail: "Across the current build",
                  },
                  {
                    label: "Critical",
                    value: criticalIssues,
                    detail: "Needs immediate attention",
                  },
                  {
                    label: "Assigned to Me",
                    value: assignedToMe,
                    detail: "Owned by Neville",
                  },
                  {
                    label: "Blocked",
                    value: blockedIssues,
                    detail: "Waiting on another fix",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-white/10 bg-[#151922]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-orange-300/20 hover:bg-white/[0.055]"
                  >
                    <p className="text-sm text-white/35">{item.label}</p>

                    <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                      {item.value}
                    </p>

                    <p className="mt-2 text-sm text-white/35">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-sm text-white/30">Current View</p>

                <h2 className="mt-1 text-2xl font-semibold text-white">
                  {activeView}
                </h2>

                <p className="mt-2 text-sm text-white/35">
                  Showing the issues that need attention in this workspace.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
                {filteredBugs.length} issue
                {filteredBugs.length === 1 ? "" : "s"}
              </span>
            </div>

            {activeView === "All Issues" ? (
              <div className="grid items-start gap-5 xl:grid-cols-4">
                {statuses.map((status, statusIndex) => {
                  const statusBugs = bugs.filter(
                    (bug) => bug.status === status,
                  );

                  return (
                    <section
                      key={status}
                      className="bug-fade-up relative min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-xl"
                      style={{
                        animationDelay: `${180 + statusIndex * 80}ms`,
                      }}
                    >
                      <div className="pointer-events-none absolute -right-20 top-0 h-40 w-40 rounded-full bg-orange-400/[0.035] blur-3xl" />

                      <div className="relative mb-5 flex items-center justify-between">
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-semibold tracking-tight text-white">
                            {status}
                          </h2>

                          <p className="mt-1 text-sm text-white/35">
                            {statusBugs.length} issue
                            {statusBugs.length === 1 ? "" : "s"}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-white/45 backdrop-blur-xl">
                          {statusBugs.length}
                        </span>
                      </div>

                      <div className="relative grid min-w-0 gap-4">
                        {statusBugs.map((bug) => (
                          <BugCard key={bug.id} bug={bug} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div
                key={activeView}
                className="bug-fade-up grid gap-5 xl:grid-cols-2"
              >
                {filteredBugs.map((bug) => (
                  <BugCard key={bug.id} bug={bug} />
                ))}

                {filteredBugs.length === 0 && (
                  <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-white/10 bg-white/[0.025] p-8 backdrop-blur-2xl">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl" />

                    <div className="relative">
                      <p className="text-lg font-semibold text-white">
                        No matching issues.
                      </p>

                      <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                        This view is clear. New issues that match this filter
                        will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </PreviewShell>
        </div>
      </div>
    </main>
  );
}