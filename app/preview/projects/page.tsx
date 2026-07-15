"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const projects = [
  {
    name: "MatterBreak",
    type: "Multiplayer Arena",
    status: "Active",
    stage: "Prototype",
    progress: "68%",
    focus: "Capture System Polish",
    next: "Beacon UI and LAN stability",
    playtest: "Saturday • 14:00",
    build: "v0.4.2",
    updated: "2 hours ago",
    accent: "orange",
    team: [
      { initials: "NV", name: "Neville Vincent", role: "Game Designer" },
      { initials: "BM", name: "Banuka Mendes", role: "Gameplay Programmer" },
      { initials: "JC", name: "Jittiwat Chada", role: "Technical Designer" },
    ],
    sprintItems: [
      "Beacon UI",
      "Material Respawn",
      "Team Colours",
      "LAN Stability",
    ],
  },
  {
    name: "Bunker Seventeen",
    type: "Psychological Horror",
    status: "Archived",
    stage: "Finished Prototype",
    progress: "100%",
    focus: "Assessment Build",
    next: "Portfolio polish",
    playtest: "Completed",
    build: "v1.0.0",
    updated: "3 weeks ago",
    accent: "emerald",
    team: [
      { initials: "NV", name: "Neville Vincent", role: "Solo Developer" },
    ],
    sprintItems: [
      "Narrative Flow",
      "Lighting Pass",
      "Audio Triggers",
      "Final Build",
    ],
  },
  {
    name: "Untitled Co-op Prototype",
    type: "Concept",
    status: "Planning",
    stage: "Concept",
    progress: "12%",
    focus: "Core Loop Exploration",
    next: "Define player roles",
    playtest: "Not scheduled",
    build: "No build yet",
    updated: "Yesterday",
    accent: "blue",
    team: [
      { initials: "NV", name: "Neville Vincent", role: "Game Designer" },
      { initials: "??", name: "Unassigned", role: "Role needed" },
    ],
    sprintItems: [
      "Core Loop",
      "Player Roles",
      "Win Condition",
      "Prototype Scope",
    ],
  },
];

type Project = (typeof projects)[number];

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
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    panel.style.setProperty("--panel-x", `${x}px`);
    panel.style.setProperty("--panel-y", `${y}px`);
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      className={`project-glass group/panel relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:border-orange-300/20 hover:bg-white/[0.065] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.07), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl transition duration-700 group-hover/panel:scale-110 group-hover/panel:bg-orange-400/[0.1]" />

      <div className="project-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/panel:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function statusStyle(project: Project) {
  if (project.status === "Archived") {
    return "border-emerald-400/15 bg-gradient-to-r from-emerald-500/15 via-emerald-400/[0.08] to-transparent text-emerald-200";
  }

  if (project.status === "Planning") {
    return "border-blue-400/15 bg-gradient-to-r from-blue-500/15 via-blue-400/[0.08] to-transparent text-blue-200";
  }

  return "border-orange-400/15 bg-gradient-to-r from-orange-500/15 via-orange-400/[0.09] to-transparent text-orange-200";
}

function progressGradient(project: Project) {
  if (project.accent === "emerald") {
    return "from-emerald-500 via-emerald-400 to-teal-300";
  }

  if (project.accent === "blue") {
    return "from-blue-500 via-cyan-400 to-sky-300";
  }

  return "from-orange-600 via-orange-400 to-amber-300";
}

function projectGlow(project: Project) {
  if (project.accent === "emerald") {
    return "bg-emerald-500/[0.08]";
  }

  if (project.accent === "blue") {
    return "bg-blue-500/[0.08]";
  }

  return "bg-orange-500/[0.09]";
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
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
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="project-card project-fade-up group relative min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/25 hover:bg-white/[0.065] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_110px_rgba(0,0,0,0.32)]"
      style={{
        animationDelay: `${140 + index * 90}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.075), transparent 64%)",
        }}
      />

      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full ${projectGlow(
          project,
        )} blur-[82px] transition-all duration-700 group-hover:scale-110`}
      />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="project-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.065] to-transparent opacity-0 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex min-h-[150px] items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl ${statusStyle(
                  project,
                )}`}
              >
                {project.status}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
                {project.stage}
              </span>
            </div>

            <h2 className="max-w-[240px] text-3xl font-semibold leading-tight tracking-tight text-white">
              {project.name}
            </h2>

            <p className="mt-3 text-sm text-white/35">{project.type}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-4xl font-bold tracking-tight text-white">
              {project.progress}
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/25">
              Progress
            </p>
          </div>
        </div>

        <div className="mb-9 h-2 overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.08] shadow-inner">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressGradient(
              project,
            )} shadow-[0_0_22px_rgba(249,115,22,0.3)] transition-all duration-1000`}
            style={{ width: project.progress }}
          />
        </div>

        <div className="grid gap-4">
          <GlassPanel className="min-h-[148px] rounded-[1.5rem] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/25">
              Current Focus
            </p>

            <p className="mt-4 text-sm font-semibold text-white">
              {project.focus}
            </p>

            <p className="mt-3 text-sm text-white/35">
              Next: {project.next}
            </p>
          </GlassPanel>

          <div className="grid grid-cols-2 gap-4">
            <GlassPanel className="min-h-[112px] rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                Playtest
              </p>

              <p className="mt-4 text-sm font-semibold leading-6 text-white">
                {project.playtest}
              </p>
            </GlassPanel>

            <GlassPanel className="min-h-[112px] rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                Build
              </p>

              <p className="mt-4 text-sm font-semibold leading-6 text-white">
                {project.build}
              </p>
            </GlassPanel>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {project.team.map((member) => (
              <div key={member.initials} className="group/member relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-300/10 bg-gradient-to-br from-orange-500/20 via-orange-400/[0.1] to-transparent text-xs font-semibold text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-300/25 hover:bg-orange-500/20">
                  {member.initials}
                </div>

                <div className="pointer-events-none absolute bottom-12 left-0 z-40 w-60 translate-y-2 rounded-[1.35rem] border border-white/10 bg-[#0B0D11]/90 p-4 text-left opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_28px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-300 group-hover/member:-translate-y-1 group-hover/member:opacity-100">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/[0.08] blur-2xl" />

                  <div className="relative">
                    <p className="text-sm font-semibold text-white">
                      {member.name}
                    </p>

                    <p className="mt-1 text-xs text-white/35">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-right text-sm text-white/30">
            Updated {project.updated}
          </p>
        </div>

        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[380px] group-hover:opacity-100">
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/25">
              Sprint Snapshot
            </p>

            <div className="space-y-2">
              {project.sprintItems.map((item, itemIndex) => (
                <div
                  key={item}
                  className="group/item relative flex items-center justify-between overflow-hidden rounded-xl border border-white/[0.06] bg-black/[0.1] px-3 py-2 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition duration-300 hover:border-orange-300/15 hover:bg-white/[0.05]"
                >
                  <div className="pointer-events-none absolute -left-8 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-orange-500/[0.07] blur-xl opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />

                  <span className="relative text-white/62">{item}</span>

                  <span
                    className={`relative ${
                      itemIndex < 2
                        ? "text-emerald-300"
                        : "text-white/28"
                    }`}
                  >
                    {itemIndex < 2 ? "Done" : "Open"}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-[1.01] hover:bg-orange-50">
              Continue Working
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const pageRef = useRef<HTMLElement>(null);

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
        @keyframes projectFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes projectDriftOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-24px, 18px, 0) scale(1.1);
          }
        }

        @keyframes projectDriftTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(28px, -20px, 0) scale(1.08);
          }
        }

        @keyframes projectSheen {
          from {
            transform: translateX(-20%) skewX(-18deg);
          }

          to {
            transform: translateX(340%) skewX(-18deg);
          }
        }

        .project-fade-up {
          animation: projectFadeUp 0.75s ease-out both;
        }

        .project-drift-one {
          animation: projectDriftOne 11s ease-in-out infinite;
        }

        .project-drift-two {
          animation: projectDriftTwo 14s ease-in-out infinite;
        }

        .project-card:hover > .project-sheen,
        .project-glass:hover .project-sheen {
          animation: projectSheen 1.15s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-fade-up,
          .project-drift-one,
          .project-drift-two,
          .project-card:hover > .project-sheen,
          .project-glass:hover .project-sheen {
            animation: none;
          }
        }
      `}</style>

      {/* Reactive universal background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0F1115]" />

        <div
          className="absolute inset-0 opacity-90 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(660px circle at var(--mouse-x, 65vw) var(--mouse-y, 35vh), rgba(249,115,22,0.14), transparent 66%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(400px circle at var(--mouse-x, 65vw) var(--mouse-y, 35vh), rgba(255,255,255,0.045), transparent 72%)",
          }}
        />

        <div className="project-drift-one absolute -right-48 top-[10%] h-[580px] w-[580px] rounded-full bg-orange-500/[0.08] blur-[135px]" />

        <div className="project-drift-two absolute -left-56 top-[52%] h-[540px] w-[540px] rounded-full bg-orange-900/[0.07] blur-[155px]" />

        <div className="absolute bottom-[-220px] left-[38%] h-[520px] w-[520px] rounded-full bg-white/[0.025] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.32) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 82%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="pt-24">
          <PreviewShell>
            <div className="project-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <p className="text-sm text-white/30">Workspace</p>

                <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                  Projects
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-white/42">
                  See where every game stands, what your team is working on, and
                  what needs attention next.
                </p>
              </div>

              <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
                New Project
                <span className="text-lg leading-none">+</span>
              </button>
            </div>

            <div className="grid items-start gap-5 xl:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </PreviewShell>
        </div>
      </div>
    </main>
  );
}