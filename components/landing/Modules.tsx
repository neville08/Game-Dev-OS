"use client";

import {
  Bug,
  CheckCircle2,
  FileText,
  FolderKanban,
  MessageCircle,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Reveal from "./Reveal";

const modules = [
  {
    title: "Projects",
    subtitle: "Plan production without messy spreadsheets.",
    icon: FolderKanban,
    preview: "projects",
  },
  {
    title: "Playtests",
    subtitle: "Turn feedback into design decisions.",
    icon: PlayCircle,
    preview: "playtests",
  },
  {
    title: "Tasks",
    subtitle: "Keep the team moving every sprint.",
    icon: CheckCircle2,
    preview: "tasks",
  },
  {
    title: "Bug Tracker",
    subtitle: "Track, triage and fix build issues faster.",
    icon: Bug,
    preview: "bugs",
  },
  {
    title: "Design Docs",
    subtitle: "GDDs, mechanics and references in one place.",
    icon: FileText,
    preview: "docs",
  },
  {
    title: "AI Assistant",
    subtitle: "A production-aware copilot for your game.",
    icon: MessageCircle,
    preview: "ai",
  },
];

export default function Modules() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
              <Sparkles size={15} />
              Built for indie game production
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Your studio, organised like a premium product.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-8 text-white/55">
              Game Dev OS brings planning, playtesting, tasks, bugs, docs and AI
              support into one polished workspace.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <Reveal key={module.title} delay={index * 80} className="h-full">
                <div className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/40 transition duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.055]">
                  <div className="h-[130px]">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/20">
                      <Icon size={20} />
                    </div>

                    <h3 className="text-xl font-medium">{module.title}</h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">
                      {module.subtitle}
                    </p>
                  </div>

                  <div className="mt-auto h-[230px]">
                    <Preview type={module.preview} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Preview({ type }: { type: string }) {
  if (type === "projects") {
    return (
      <div className="h-full rounded-3xl border border-white/10 bg-black/40 p-4">
        <div className="mb-4 flex items-center justify-between text-xs text-white/40">
          <span>Roadmap</span>
          <span>68%</span>
        </div>

        <div className="space-y-3">
          {["Prototype", "Vertical Slice", "Pitch Build"].map((item, index) => (
            <div key={item} className="rounded-2xl bg-white/[0.04] p-3">
              <div className="mb-2 flex justify-between text-xs">
                <span>{item}</span>
                <span className="text-orange-300">{[100, 72, 34][index]}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-orange-400 transition-all duration-700 group-hover:w-full"
                  style={{ width: `${[100, 72, 34][index]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "playtests") {
    return (
      <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-4">
        <div className="mb-4 text-xs text-white/40">Weekly feedback</div>

        <div className="space-y-3">
          {[
            ["Fun", "86%"],
            ["Clarity", "74%"],
            ["Balance", "61%"],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-xs">
                <span>{label}</span>
                <span className="text-orange-300">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-orange-400"
                  style={{ width: value }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex h-16 items-end gap-2">
          {[25, 42, 38, 65, 58, 82, 76].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-lg bg-white/10 transition-all duration-500 group-hover:bg-orange-400/70"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "tasks") {
    return (
      <div className="grid h-full grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-black/40 p-4">
        {["Todo", "Doing", "Done"].map((column, index) => (
          <div key={column}>
            <div className="mb-3 text-[11px] text-white/35">{column}</div>

            <div className="space-y-2">
              {(index === 0
                ? ["UI Pass", "Audio"]
                : index === 1
                ? ["Matchmaking"]
                : ["Sprint Notes"]
              ).map((task) => (
                <div
                  key={task}
                  className="flex min-h-10 items-center rounded-xl bg-white/[0.055] px-3 py-2 text-[11px] leading-none text-white/70"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "bugs") {
    return (
      <div className="h-full rounded-3xl border border-white/10 bg-black/40 p-4">
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            ["Critical", "3"],
            ["Major", "12"],
            ["Fixed", "28"],
          ].map(([label, count]) => (
            <div key={label} className="rounded-2xl bg-white/[0.045] p-3">
              <div className="text-lg font-medium">{count}</div>
              <div className="text-[11px] text-white/35">{label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {["Spawn overlap", "Beacon desync", "Material pickup"].map((bug) => (
            <div
              key={bug}
              className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-xs"
            >
              <span>{bug}</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-1 text-[10px] text-orange-300">
                Open
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "docs") {
    return (
      <div className="relative h-full rounded-3xl border border-white/10 bg-black/40 p-4">
        {[
          ["Game Design Document", "Core loop, pillars, mechanics"],
          ["Level Design Notes", "Beacon routes, cover, flow"],
          ["Material System", "Rock, rubber, cooldowns"],
        ].map(([title, body], index) => (
          <div
            key={title}
            className="absolute left-4 right-4 rounded-2xl border border-white/10 bg-[#111] p-4 shadow-xl transition duration-500 group-hover:-translate-y-1"
            style={{
              top: `${16 + index * 42}px`,
              opacity: 1 - index * 0.18,
            }}
          >
            <div className="text-xs font-medium">{title}</div>
            <div className="mt-1 text-[11px] text-white/35">{body}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-4">
      <div className="space-y-3">
        <div className="max-w-[80%] rounded-2xl bg-white/[0.06] p-3 text-xs text-white/60">
          How do I improve this playtest summary?
        </div>

        <div className="ml-auto max-w-[88%] rounded-2xl bg-orange-500/15 p-3 text-xs text-orange-100">
          Your players understand the goal, but struggle with material timing.
        </div>

        <div className="max-w-[82%] rounded-2xl bg-white/[0.06] p-3 text-xs text-white/60">
          Suggest 3 design changes.
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 text-xs text-white/35">
        <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
        AI is thinking
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
}