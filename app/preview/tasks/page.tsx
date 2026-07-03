"use client";

import { useState } from "react";
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

const views = ["Sprint Focus", "My Tasks", "High Priority", "Due Soon", "Blocked"];
const columns = ["Backlog", "In Progress", "Review", "Done"];

function getFilteredTasks(view: string) {
  if (view === "My Tasks") return tasks.filter((task) => task.assignee === currentUser);
  if (view === "High Priority") return tasks.filter((task) => task.priority === "High");
  if (view === "Due Soon") {
    return tasks.filter((task) =>
      ["Today", "Tomorrow", "Friday"].includes(task.deadline),
    );
  }
  if (view === "Blocked") return tasks.filter((task) => task.blocked);
  return tasks;
}

function priorityStyle(priority: string) {
  if (priority === "High") return "bg-red-500/10 text-red-300";
  if (priority === "Done") return "bg-emerald-500/10 text-emerald-300";
  if (priority === "Low") return "bg-blue-500/10 text-blue-300";
  return "bg-orange-500/10 text-orange-300";
}

function TaskCard({ task }: { task: (typeof tasks)[number] }) {
  return (
    <article className="group/card flex h-[372px] flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-400/30 hover:bg-white/[0.075] hover:shadow-2xl hover:shadow-orange-500/5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="max-w-[130px] truncate rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/50">
          {task.category}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyle(
            task.priority,
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="h-[58px] overflow-hidden text-lg font-semibold leading-snug tracking-tight text-white">
        {task.title}
      </h3>

      <p className="mt-4 h-[78px] overflow-hidden text-sm leading-6 text-white/42">
        {task.note}
      </p>

      <div className="mt-auto border-t border-white/10 pt-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
              Assigned
            </p>
            <p className="mt-2 truncate text-sm font-medium leading-5 text-white/70">
              {task.assignee}
            </p>
          </div>

          <div className="min-w-0 text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
              Due
            </p>
            <p className="mt-2 truncate text-sm font-medium leading-5 text-white/70">
              {task.deadline}
            </p>
          </div>
        </div>

        <div className="mt-5 flex h-[28px] items-center justify-between gap-3">
          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300/90">
            {task.source}
          </span>

          {task.blocked && (
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
              Blocked
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function TasksPage() {
  const [activeView, setActiveView] = useState("Sprint Focus");
  const filteredTasks = getFilteredTasks(activeView);

  const openTasks = tasks.filter((task) => task.status !== "Done").length;
  const myTasks = tasks.filter((task) => task.assignee === currentUser).length;
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
            @keyframes softFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
              50% { transform: translateY(-10px) rotate(3deg); opacity: 1; }
            }

            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(18px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes tabGlow {
              from { transform: scaleX(0.35); opacity: 0; }
              to { transform: scaleX(1); opacity: 1; }
            }

            .soft-float {
              animation: softFloat 5s ease-in-out infinite;
            }

            .task-fade-up {
              animation: fadeUp 0.7s ease-out both;
            }

            .tab-glow {
              animation: tabGlow 0.35s ease-out both;
            }
          `}</style>

          <div className="task-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-white/35">MatterBreak</p>
              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Tasks
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/45">
                Plan, prioritize and ship with clarity.
              </p>
            </div>

            <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-black/20 transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
              New Task
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <div className="task-fade-up mb-7 rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:80ms]">
            <div className="grid gap-2 lg:grid-cols-5">
              {views.map((view) => {
                const active = activeView === view;

                return (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`relative rounded-[1.5rem] px-5 py-4 text-left transition-all duration-300 ${
                      active
                        ? "bg-orange-500/10 text-orange-300"
                        : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-semibold">{view}</p>

                    {active && (
                      <div className="tab-glow absolute inset-x-5 -bottom-2 h-px origin-center bg-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="task-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:140ms]">
            <div className="soft-float pointer-events-none absolute -right-10 top-5 h-36 w-36 rounded-[2rem] border border-orange-400/30 bg-orange-500/10 blur-sm" />
            <div className="pointer-events-none absolute -right-16 top-14 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative grid gap-4 xl:grid-cols-4">
              {[
                { label: "Open Tasks", value: openTasks, detail: "Across the board" },
                { label: "My Tasks", value: myTasks, detail: "Assigned to you" },
                { label: "Due Soon", value: dueSoon, detail: "Due within 3 days" },
                { label: "Blocked", value: blocked, detail: "Needs attention" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.4rem] border border-white/10 bg-[#151922]/75 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/20"
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

          {activeView === "Sprint Focus" ? (
            <div className="grid items-start gap-5 xl:grid-cols-4">
              {columns.map((column, columnIndex) => {
                const columnTasks = tasks.filter((task) => task.status === column);

                return (
                  <section
                    key={column}
                    className="task-fade-up rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    style={{ animationDelay: `${180 + columnIndex * 80}ms` }}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-semibold tracking-tight text-white">
                        {column}
                      </h2>

                      <span className="rounded-full bg-white/[0.05] px-3 py-1 text-sm text-white/45">
                        {columnTasks.length}
                      </span>
                    </div>

                    <div className="grid gap-4">
                      {columnTasks.map((task) => (
                        <TaskCard key={task.title} task={task} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div key={activeView} className="task-fade-up grid gap-5 xl:grid-cols-2">
              {filteredTasks.map((task) => (
                <TaskCard key={task.title} task={task} />
              ))}
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