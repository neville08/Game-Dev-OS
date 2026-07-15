"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const documents = [
  {
    id: "DOC-021",
    title: "MatterBreak Game Design Document",
    type: "GDD",
    category: "Game Design",
    status: "Active",
    owner: "Neville Vincent",
    updated: "25 minutes ago",
    progress: "82%",
    description:
      "Core gameplay pillars, material abilities, beacon capture rules and the multiplayer match structure.",
    sections: 18,
    collaborators: 3,
    linkedItems: "12 tasks",
    accent: "orange",
    tags: ["Core Loop", "Materials", "Beacons"],
  },
  {
    id: "DOC-020",
    title: "Arena Level Design Document",
    type: "LDD",
    category: "Level Design",
    status: "In Review",
    owner: "Jittiwat Chada",
    updated: "2 hours ago",
    progress: "68%",
    description:
      "Map routes, central beacon combat space, cover placement, material pickups and player flow.",
    sections: 12,
    collaborators: 3,
    linkedItems: "6 tasks",
    accent: "blue",
    tags: ["Arena", "Routes", "Cover"],
  },
  {
    id: "DOC-019",
    title: "LAN Multiplayer Technical Notes",
    type: "Technical",
    category: "Engineering",
    status: "Active",
    owner: "Banuka Mendes",
    updated: "Yesterday",
    progress: "74%",
    description:
      "Server authority, projectile replication, team visuals, damage handling and respawn architecture.",
    sections: 15,
    collaborators: 2,
    linkedItems: "8 bugs",
    accent: "violet",
    tags: ["Networking", "Replication", "SGAS"],
  },
  {
    id: "DOC-018",
    title: "Material Ability Balance Sheet",
    type: "Systems",
    category: "Game Balance",
    status: "Needs Update",
    owner: "Neville Vincent",
    updated: "Yesterday",
    progress: "46%",
    description:
      "Durability values, strengths, counters, cooldowns and balancing observations from recent playtests.",
    sections: 9,
    collaborators: 3,
    linkedItems: "4 playtests",
    accent: "amber",
    tags: ["Rock", "Rubber", "Water"],
  },
  {
    id: "DOC-017",
    title: "MatterBreak World and Narrative",
    type: "Narrative",
    category: "Worldbuilding",
    status: "Draft",
    owner: "Neville Vincent",
    updated: "3 days ago",
    progress: "31%",
    description:
      "The cosmic event, matter deterioration, mutant competitors and the sport surrounding the arena.",
    sections: 7,
    collaborators: 1,
    linkedItems: "3 notes",
    accent: "rose",
    tags: ["World", "Lore", "Characters"],
  },
  {
    id: "DOC-016",
    title: "Playtest Research Notes",
    type: "Research",
    category: "User Research",
    status: "Archived",
    owner: "Neville Vincent",
    updated: "Last week",
    progress: "100%",
    description:
      "Observations covering fun, clarity, map control, materials, balance and recurring player confusion.",
    sections: 14,
    collaborators: 3,
    linkedItems: "5 playtests",
    accent: "emerald",
    tags: ["Feedback", "Clarity", "Balance"],
  },
];

const views = [
  "All Documents",
  "Game Design",
  "Level Design",
  "Technical",
  "Research",
];

type DocumentItem = (typeof documents)[number];

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

function getFilteredDocuments(view: string) {
  if (view === "Game Design") {
    return documents.filter((document) =>
      ["Game Design", "Game Balance"].includes(document.category),
    );
  }

  if (view === "Level Design") {
    return documents.filter(
      (document) => document.category === "Level Design",
    );
  }

  if (view === "Technical") {
    return documents.filter(
      (document) => document.category === "Engineering",
    );
  }

  if (view === "Research") {
    return documents.filter(
      (document) => document.category === "User Research",
    );
  }

  return documents;
}

function statusStyle(status: string) {
  if (status === "Active") {
    return "border-orange-400/20 bg-gradient-to-r from-orange-500/18 via-orange-400/[0.09] to-transparent text-orange-200";
  }

  if (status === "In Review") {
    return "border-blue-400/20 bg-gradient-to-r from-blue-500/18 via-cyan-400/[0.08] to-transparent text-blue-200";
  }

  if (status === "Needs Update") {
    return "border-amber-400/20 bg-gradient-to-r from-amber-500/18 via-yellow-400/[0.08] to-transparent text-amber-200";
  }

  if (status === "Archived") {
    return "border-emerald-400/20 bg-gradient-to-r from-emerald-500/18 via-emerald-400/[0.08] to-transparent text-emerald-200";
  }

  return "border-white/10 bg-white/[0.05] text-white/50";
}

function documentGradient(accent: string) {
  if (accent === "blue") {
    return "from-blue-500 via-cyan-400 to-sky-300";
  }

  if (accent === "violet") {
    return "from-violet-500 via-fuchsia-400 to-pink-300";
  }

  if (accent === "amber") {
    return "from-amber-500 via-orange-400 to-yellow-300";
  }

  if (accent === "rose") {
    return "from-rose-500 via-pink-400 to-orange-300";
  }

  if (accent === "emerald") {
    return "from-emerald-500 via-teal-400 to-cyan-300";
  }

  return "from-orange-600 via-orange-400 to-amber-300";
}

function documentGlow(accent: string) {
  if (accent === "blue") return "bg-blue-500/[0.08]";
  if (accent === "violet") return "bg-violet-500/[0.08]";
  if (accent === "amber") return "bg-amber-500/[0.08]";
  if (accent === "rose") return "bg-rose-500/[0.08]";
  if (accent === "emerald") return "bg-emerald-500/[0.08]";
  return "bg-orange-500/[0.09]";
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
      className={`docs-glass group/panel relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/20 hover:bg-white/[0.065] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.07), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl transition duration-700 group-hover/panel:scale-110 group-hover/panel:bg-orange-400/[0.1]" />

      <div className="docs-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/panel:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function DocumentCard({
  document,
  index,
}: {
  document: DocumentItem;
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
      className="docs-card docs-fade-up group relative flex min-h-[470px] min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/25 hover:bg-white/[0.065] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_110px_rgba(0,0,0,0.32)]"
      style={{
        animationDelay: `${160 + index * 80}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(430px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.075), transparent 64%)",
        }}
      />

      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full ${documentGlow(
          document.accent,
        )} blur-[82px] transition-all duration-700 group-hover:scale-110`}
      />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="docs-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.065] to-transparent opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full min-w-0 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/28">
              {document.id}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs font-medium text-white/55 backdrop-blur-xl">
                {document.type}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${statusStyle(
                  document.status,
                )}`}
              >
                {document.status}
              </span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-3xl font-bold tracking-tight text-white">
              {document.progress}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/25">
              Complete
            </p>
          </div>
        </div>

        <h2 className="mt-6 min-h-[68px] text-2xl font-semibold leading-tight tracking-tight text-white">
          {document.title}
        </h2>

        <p className="mt-4 min-h-[86px] text-sm leading-6 text-white/40">
          {document.description}
        </p>

        <div className="mt-6 h-2 overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.08] shadow-inner">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${documentGradient(
              document.accent,
            )} transition-all duration-1000`}
            style={{ width: document.progress }}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Sections", value: document.sections },
            { label: "Editors", value: document.collaborators },
            { label: "Linked", value: document.linkedItems },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.3rem] border border-white/10 bg-black/[0.1] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
                {item.label}
              </p>

              <p className="mt-2 text-sm font-semibold text-white/72">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {document.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-xs text-white/38"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-white/10 pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Owner
              </p>

              <p className="mt-2 text-sm font-medium text-white/70">
                {document.owner}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Updated
              </p>

              <p className="mt-2 text-sm text-white/42">{document.updated}</p>
            </div>
          </div>

          <button className="mt-5 w-full rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/70 transition duration-300 hover:border-orange-300/20 hover:bg-white hover:text-black">
            Open Document
          </button>
        </div>
      </div>
    </article>
  );
}

export default function DocsPage() {
  const [activeView, setActiveView] = useState("All Documents");

  const filteredDocuments = getFilteredDocuments(activeView);

  const activeDocuments = documents.filter(
    (document) => document.status === "Active",
  ).length;

  const reviews = documents.filter(
    (document) => document.status === "In Review",
  ).length;

  const collaborators = 3;

  const linkedItems = documents.reduce((total, document) => {
    const value = Number.parseInt(document.linkedItems, 10);
    return total + (Number.isNaN(value) ? 0 : value);
  }, 0);

  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <style>{`
            @keyframes docsFadeUp {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes docsTabIn {
              from {
                transform: scaleX(0.35);
                opacity: 0;
              }

              to {
                transform: scaleX(1);
                opacity: 1;
              }
            }

            @keyframes docsSheen {
              from {
                transform: translateX(-20%) skewX(-18deg);
              }

              to {
                transform: translateX(340%) skewX(-18deg);
              }
            }

            @keyframes docsAmbientFloat {
              0%, 100% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.55;
              }

              50% {
                transform: translate3d(-12px, -8px, 0) scale(1.08);
                opacity: 0.9;
              }
            }

            .docs-fade-up {
              animation: docsFadeUp 0.75s ease-out both;
            }

            .docs-tab-in {
              animation: docsTabIn 0.35s ease-out both;
            }

            .docs-ambient-float {
              animation: docsAmbientFloat 8s ease-in-out infinite;
            }

            .docs-card:hover > .docs-sheen,
            .docs-glass:hover .docs-sheen {
              animation: docsSheen 1.15s ease-out both;
            }

            @media (prefers-reduced-motion: reduce) {
              .docs-fade-up,
              .docs-tab-in,
              .docs-ambient-float,
              .docs-card:hover > .docs-sheen,
              .docs-glass:hover .docs-sheen {
                animation: none;
              }
            }
          `}</style>

          <div className="docs-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-white/30">MatterBreak</p>

              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Docs
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/42">
                Keep game design, technical decisions, research and production
                knowledge connected to the work they support.
              </p>
            </div>

            <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
              New Document
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <div className="docs-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl [animation-delay:80ms]">
            <div className="docs-ambient-float pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-orange-500/[0.07] blur-3xl" />

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
                      <span className="docs-tab-in absolute inset-x-5 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-orange-300 to-transparent shadow-[0_0_18px_rgba(251,146,60,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="docs-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl [animation-delay:140ms]">
            <div className="docs-ambient-float pointer-events-none absolute -right-16 top-2 h-52 w-52 rounded-full bg-orange-500/[0.08] blur-3xl" />

            <div className="relative grid gap-4 xl:grid-cols-4">
              {[
                {
                  label: "Active Documents",
                  value: activeDocuments,
                  detail: "Currently maintained",
                },
                {
                  label: "In Review",
                  value: reviews,
                  detail: "Waiting for feedback",
                },
                {
                  label: "Collaborators",
                  value: collaborators,
                  detail: "Across MatterBreak",
                },
                {
                  label: "Linked Items",
                  value: linkedItems,
                  detail: "Tasks, bugs and tests",
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

          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm text-white/30">Document Library</p>

              <h2 className="mt-1 text-2xl font-semibold text-white">
                {activeView}
              </h2>

              <p className="mt-2 text-sm text-white/35">
                Structured project knowledge that stays connected to production.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/45 backdrop-blur-xl">
              {filteredDocuments.length} document
              {filteredDocuments.length === 1 ? "" : "s"}
            </span>
          </div>

          <div
            key={activeView}
            className="docs-fade-up grid gap-5 xl:grid-cols-3"
          >
            {filteredDocuments.map((document, index) => (
              <DocumentCard
                key={document.id}
                document={document}
                index={index}
              />
            ))}

            {filteredDocuments.length === 0 && (
              <GlassPanel className="rounded-[2rem] border-dashed p-8">
                <p className="text-lg font-semibold text-white">
                  No documents in this category.
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                  New documents matching this view will appear here.
                </p>
              </GlassPanel>
            )}
          </div>
        </PreviewShell>
      </div>
    </main>
  );
}