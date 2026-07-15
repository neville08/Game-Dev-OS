"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const currentUser = "Neville Vincent";

const tasks = [
  {
    title: "Improve beacon ownership feedback",
    status: "In Progress",
    category: "UI / Gameplay",
    priority: "High",
    assignee: "Neville Vincent",
    source: "Playtest #15",
    deadline: "Tomorrow",
    blocked: false,
    note: "Make contested and captured beacon states easier to read during team fights.",
  },
  {
    title: "Fix LAN lobby player colour sync",
    status: "In Progress",
    category: "Network",
    priority: "High",
    assignee: "Banuka Mendes",
    source: "Bug #08",
    deadline: "Friday",
    blocked: true,
    note: "Players should always see themselves as blue and enemies as red.",
  },
  {
    title: "Document material counter rules",
    status: "Backlog",
    category: "Design Docs",
    priority: "Medium",
    assignee: "Jittiwat Chada",
    source: "GDD",
    deadline: "Next week",
    blocked: false,
    note: "Clarify how Rock, Rubber and Stone counter each other for new players.",
  },
  {
    title: "Add playtest onboarding questions",
    status: "Backlog",
    category: "Playtest",
    priority: "Low",
    assignee: "Neville Vincent",
    source: "Playtest #15",
    deadline: "Today",
    blocked: false,
    note: "Ask testers if the capture goal is understood during their first round.",
  },
  {
    title: "Check material respawn timing",
    status: "Review",
    category: "Gameplay",
    priority: "Medium",
    assignee: "Banuka Mendes",
    source: "Playtest #14",
    deadline: "Tomorrow",
    blocked: false,
    note: "Verify pickup rhythm before the next LAN balance test.",
  },
  {
    title: "Review capture UI icons",
    status: "Review",
    category: "UI",
    priority: "Medium",
    assignee: "Jittiwat Chada",
    source: "Playtest #14",
    deadline: "Monday",
    blocked: false,
    note: "Improve contrast for neutral, contested and team-owned states.",
  },
  {
    title: "Update project team colour logic",
    status: "Done",
    category: "Gameplay",
    priority: "Done",
    assignee: "Neville Vincent",
    source: "Sprint 2",
    deadline: "Done",
    blocked: false,
    note: "Local player sees blue while opponents appear red.",
  },
  {
    title: "Create project command center",
    status: "Done",
    category: "Product",
    priority: "Done",
    assignee: "Neville Vincent",
    source: "Preview",
    deadline: "Done",
    blocked: false,
    note: "Built the first interactive Game Dev OS product page.",
  },
];

const views = [
  "Sprint Focus",
  "My Tasks",
  "High Priority",
  "Due Soon",
  "Blocked",
];

const columns = ["Backlog", "In Progress", "Review", "Done"];

type Task = (typeof tasks)[number];

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

function getFilteredTasks(view: string) {
  if (view === "My Tasks") {
    return tasks.filter((task) => task.assignee === currentUser);
  }

  if (view === "High Priority") {
    return tasks.filter((task) => task.priority === "High");
  }

  if (view === "Due Soon") {
    return tasks.filter((task) =>
      ["Today", "Tomorrow", "Friday"].includes(task.deadline),
    );
  }

  if (view === "Blocked") {
    return tasks.filter((task) => task.blocked);
  }

  return tasks;
}

function priorityStyle(priority: string) {
  if (priority === "High") {
    return "border-red-400/20 bg-gradient-to-r from-red-500/18 via-red-400/[0.09] to-transparent text-red-200";
  }

  if (priority === "Done") {
    return "border-emerald-400/20 bg-gradient-to-r from-emerald-500/18 via-emerald-400/[0.09] to-transparent text-emerald-200";
  }

  if (priority === "Low") {
    return "border-blue-400/20 bg-gradient-to-r from-blue-500/18 via-blue-400/[0.09] to-transparent text-blue-200";
  }

  return "border-amber-400/20 bg-gradient-to-r from-amber-500/18 via-orange-400/[0.09] to-transparent text-amber-200";
}

function columnAccent(column: string) {
  if (column === "In Progress") {
    return {
      glow: "bg-orange-500/[0.08]",
      dot: "bg-orange-400",
      line: "from-orange-500 via-orange-300 to-transparent",
    };
  }

  if (column === "Review") {
    return {
      glow: "bg-blue-500/[0.07]",
      dot: "bg-blue-400",
      line: "from-blue-500 via-cyan-300 to-transparent",
    };
  }

  if (column === "Done") {
    return {
      glow: "bg-emerald-500/[0.07]",
      dot: "bg-emerald-400",
      line: "from-emerald-500 via-emerald-300 to-transparent",
    };
  }

  return {
    glow: "bg-white/[0.035]",
    dot: "bg-white/35",
    line: "from-white/30 via-white/10 to-transparent",
  };
}

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
      className={`task-glass group/panel relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/20 hover:bg-white/[0.065] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.07), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl transition duration-700 group-hover/panel:scale-110 group-hover/panel:bg-orange-400/[0.1]" />

      <div className="task-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/panel:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
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
      className="task-card group/card relative flex h-[390px] min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/25 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_28px_85px_rgba(0,0,0,0.26)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.075), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-400/[0.07] blur-3xl transition duration-700 group-hover/card:scale-110 group-hover/card:bg-orange-400/[0.12]" />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="task-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.065] to-transparent opacity-0 group-hover/card:opacity-100" />

      <div className="relative z-10 flex h-full min-w-0 flex-col">
        <div className="mb-5 flex h-[34px] items-center justify-between gap-3">
          <span className="max-w-[135px] truncate rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
            {task.category}
          </span>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${priorityStyle(
              task.priority,
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <h3 className="h-[62px] overflow-hidden text-lg font-semibold leading-snug tracking-tight text-white">
          {task.title}
        </h3>

        <p className="mt-4 h-[82px] overflow-hidden text-sm leading-6 text-white/42">
          {task.note}
        </p>

        <div className="mt-auto border-t border-white/10 pt-5">
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Assigned
              </p>

              <p className="mt-2 text-sm font-medium leading-5 text-white/70">
                {task.assignee}
              </p>
            </div>

            <div className="min-w-[74px] text-right">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Due
              </p>

              <p className="mt-2 whitespace-nowrap text-sm font-medium leading-5 text-white/70">
                {task.deadline}
              </p>
            </div>
          </div>

          <div className="mt-5 flex h-[30px] items-center justify-between gap-3">
            <span className="min-w-0 truncate rounded-full border border-orange-300/10 bg-gradient-to-r from-orange-500/15 via-orange-400/[0.07] to-transparent px-3 py-1 text-xs font-medium text-orange-200/90 backdrop-blur-xl">
              {task.source}
            </span>

            {task.blocked && (
              <span className="shrink-0 rounded-full border border-red-400/15 bg-gradient-to-r from-red-500/18 via-red-400/[0.08] to-transparent px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-xl">
                Blocked
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TasksPage() {
  const [activeView, setActiveView] = useState("Sprint Focus");
  const filteredTasks = getFilteredTasks(activeView);

  const openTasks = tasks.filter((task) => task.status !== "Done").length;

  const myTasks = tasks.filter(
    (task) => task.assignee === currentUser,
  ).length;

  const dueSoon = tasks.filter((task) =>
    ["Today", "Tomorrow", "Friday"].includes(task.deadline),
  ).length;

  const blocked = tasks.filter((task) => task.blocked).length;

  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <style>{`
            @keyframes taskFadeUp {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes taskTabGlow {
              from {
                transform: scaleX(0.35);
                opacity: 0;
              }

              to {
                transform: scaleX(1);
                opacity: 1;
              }
            }

            @keyframes taskSheen {
              from {
                transform: translateX(-20%) skewX(-18deg);
              }

              to {
                transform: translateX(340%) skewX(-18deg);
              }
            }

            @keyframes taskAmbientFloat {
              0%, 100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
                opacity: 0.55;
              }

              50% {
                transform: translate3d(-12px, -8px, 0) rotate(3deg);
                opacity: 0.9;
              }
            }

            .task-fade-up {
              animation: taskFadeUp 0.7s ease-out both;
            }

            .task-tab-glow {
              animation: taskTabGlow 0.35s ease-out both;
            }

            .task-ambient-float {
              animation: taskAmbientFloat 7s ease-in-out infinite;
            }

            .task-card:hover > .task-sheen,
            .task-glass:hover .task-sheen {
              animation: taskSheen 1.15s ease-out both;
            }

            @media (prefers-reduced-motion: reduce) {
              .task-fade-up,
              .task-tab-glow,
              .task-ambient-float,
              .task-card:hover > .task-sheen,
              .task-glass:hover .task-sheen {
                animation: none;
              }
            }
          `}</style>

          <div className="task-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-white/30">MatterBreak</p>

              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Tasks
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/42">
                Plan, prioritize and ship with clarity.
              </p>
            </div>

            <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
              New Task
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <div className="task-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl [animation-delay:80ms]">
            <div className="task-ambient-float pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-orange-500/[0.07] blur-3xl" />

            <div className="relative grid gap-2 lg:grid-cols-5">
              {views.map((view) => {
                const active = activeView === view;

                return (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`relative overflow-hidden rounded-[1.5rem] border px-5 py-4 text-center transition-all duration-300 ${
                      active
                        ? "border-orange-300/20 bg-gradient-to-r from-orange-500/18 via-orange-400/[0.08] to-white/[0.02] text-orange-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
                        : "border-transparent text-white/45 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 text-sm font-semibold">
                      {view}
                    </span>

                    {active && (
                      <span className="task-tab-glow absolute inset-x-5 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-orange-300 to-transparent shadow-[0_0_18px_rgba(251,146,60,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="task-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl [animation-delay:140ms]">
            <div className="task-ambient-float pointer-events-none absolute -right-14 top-4 h-48 w-48 rounded-full bg-orange-500/[0.08] blur-3xl" />

            <div className="relative grid gap-4 xl:grid-cols-4">
              {[
                {
                  label: "Open Tasks",
                  value: openTasks,
                  detail: "Across the board",
                },
                {
                  label: "My Tasks",
                  value: myTasks,
                  detail: "Assigned to you",
                },
                {
                  label: "Due Soon",
                  value: dueSoon,
                  detail: "Due within 3 days",
                },
                {
                  label: "Blocked",
                  value: blocked,
                  detail: "Needs attention",
                },
              ].map((item) => (
                <GlassPanel
                  key={item.label}
                  className="rounded-[1.45rem] p-5"
                >
                  <p className="text-sm text-white/35">{item.label}</p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm text-white/30">{item.detail}</p>
                </GlassPanel>
              ))}
            </div>
          </div>

          {activeView === "Sprint Focus" ? (
            <div className="grid items-start gap-5 xl:grid-cols-4">
              {columns.map((column, columnIndex) => {
                const columnTasks = tasks.filter(
                  (task) => task.status === column,
                );

                const accent = columnAccent(column);

                return (
                  <section
                    key={column}
                    className="task-fade-up relative min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_70px_rgba(0,0,0,0.13)] backdrop-blur-xl"
                    style={{
                      animationDelay: `${180 + columnIndex * 80}ms`,
                    }}
                  >
                    <div
                      className={`pointer-events-none absolute -right-20 -top-16 h-44 w-44 rounded-full ${accent.glow} blur-3xl`}
                    />

                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line}`}
                    />

                    <div className="relative mb-5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${accent.dot}`}
                          />

                          <h2 className="text-xl font-semibold tracking-tight text-white">
                            {column}
                          </h2>
                        </div>

                        <p className="mt-2 text-sm text-white/30">
                          {columnTasks.length} task
                          {columnTasks.length === 1 ? "" : "s"}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-white/45 backdrop-blur-xl">
                        {columnTasks.length}
                      </span>
                    </div>

                    <div className="relative grid gap-4">
                      {columnTasks.map((task) => (
                        <TaskCard key={task.title} task={task} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div
              key={activeView}
              className="task-fade-up grid gap-5 xl:grid-cols-2"
            >
              {filteredTasks.map((task) => (
                <TaskCard key={task.title} task={task} />
              ))}

              {filteredTasks.length === 0 && (
                <GlassPanel className="rounded-[2rem] border-dashed p-8">
                  <p className="text-lg font-semibold text-white">
                    No matching tasks.
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                    This view is clear. New tasks matching this filter will
                    appear here.
                  </p>
                </GlassPanel>
              )}
            </div>
          )}

          <p className="mt-10 text-center text-sm text-white/35">
            ✧ Drag and drop tasks to update status
          </p>
        </PreviewShell>
      </div>
    </main>
  );
}