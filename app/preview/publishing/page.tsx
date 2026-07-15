"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const releases = [
  {
    id: "REL-008",
    title: "MatterBreak LAN Playtest Build",
    version: "v0.4.2",
    channel: "Internal",
    status: "Ready",
    platform: "Windows",
    owner: "Neville Vincent",
    updated: "25 minutes ago",
    size: "2.8 GB",
    completion: "88%",
    accent: "orange",
    description:
      "Current LAN prototype prepared for the next structured team playtest.",
    checklist: [
      { label: "Package Windows build", complete: true },
      { label: "Verify LAN host and join flow", complete: true },
      { label: "Complete regression test", complete: true },
      { label: "Attach known issues", complete: false },
      { label: "Share build with testers", complete: false },
    ],
    destinations: ["Team Testers", "Google Drive"],
  },
  {
    id: "REL-007",
    title: "MatterBreak Public Prototype",
    version: "v0.5.0",
    channel: "Public Demo",
    status: "Planning",
    platform: "Windows",
    owner: "Neville Vincent",
    updated: "Yesterday",
    size: "Pending",
    completion: "42%",
    accent: "blue",
    description:
      "First public-facing prototype planned for portfolio and community feedback.",
    checklist: [
      { label: "Lock prototype scope", complete: true },
      { label: "Create onboarding flow", complete: false },
      { label: "Complete visual polish pass", complete: false },
      { label: "Prepare store assets", complete: false },
      { label: "Write public release notes", complete: false },
    ],
    destinations: ["itch.io", "Portfolio"],
  },
  {
    id: "REL-006",
    title: "Bunker Seventeen Assessment Build",
    version: "v1.0.0",
    channel: "Archive",
    status: "Published",
    platform: "Windows",
    owner: "Neville Vincent",
    updated: "3 weeks ago",
    size: "4.1 GB",
    completion: "100%",
    accent: "emerald",
    description:
      "Final psychological-horror prototype packaged for assessment and portfolio archiving.",
    checklist: [
      { label: "Package final build", complete: true },
      { label: "Verify narrative triggers", complete: true },
      { label: "Complete lighting pass", complete: true },
      { label: "Capture gameplay footage", complete: true },
      { label: "Archive project files", complete: true },
    ],
    destinations: ["Assessment", "Portfolio"],
  },
];

const views = [
  "Release Pipeline",
  "Ready",
  "Planning",
  "Published",
  "Store Assets",
];

const storeAssets = [
  {
    label: "Capsule Artwork",
    detail: "Main storefront visual",
    status: "In Progress",
    progress: "65%",
    accent: "orange",
  },
  {
    label: "Screenshots",
    detail: "Five gameplay images",
    status: "Needs Review",
    progress: "80%",
    accent: "blue",
  },
  {
    label: "Trailer",
    detail: "60-second prototype trailer",
    status: "Not Started",
    progress: "0%",
    accent: "violet",
  },
  {
    label: "Store Description",
    detail: "Short and long-form copy",
    status: "Draft",
    progress: "45%",
    accent: "emerald",
  },
];

type Release = (typeof releases)[number];

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

function getFilteredReleases(view: string) {
  if (view === "Ready") {
    return releases.filter((release) => release.status === "Ready");
  }

  if (view === "Planning") {
    return releases.filter((release) => release.status === "Planning");
  }

  if (view === "Published") {
    return releases.filter((release) => release.status === "Published");
  }

  return releases;
}

function statusStyle(status: string) {
  if (status === "Ready") {
    return "border-orange-400/20 bg-gradient-to-r from-orange-500/18 via-orange-400/[0.09] to-transparent text-orange-200";
  }

  if (status === "Planning") {
    return "border-blue-400/20 bg-gradient-to-r from-blue-500/18 via-cyan-400/[0.08] to-transparent text-blue-200";
  }

  return "border-emerald-400/20 bg-gradient-to-r from-emerald-500/18 via-emerald-400/[0.08] to-transparent text-emerald-200";
}

function accentGradient(accent: string) {
  if (accent === "blue") {
    return "from-blue-500 via-cyan-400 to-sky-300";
  }

  if (accent === "emerald") {
    return "from-emerald-500 via-teal-400 to-cyan-300";
  }

  if (accent === "violet") {
    return "from-violet-500 via-fuchsia-400 to-pink-300";
  }

  return "from-orange-600 via-orange-400 to-amber-300";
}

function accentGlow(accent: string) {
  if (accent === "blue") return "bg-blue-500/[0.08]";
  if (accent === "emerald") return "bg-emerald-500/[0.08]";
  if (accent === "violet") return "bg-violet-500/[0.08]";

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
      className={`publishing-glass group/panel relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-300/20 hover:bg-white/[0.065] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.07), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl transition duration-700 group-hover/panel:scale-110 group-hover/panel:bg-orange-400/[0.1]" />

      <div className="publishing-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/panel:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function ReleaseCard({
  release,
  index,
}: {
  release: Release;
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

  const completedItems = release.checklist.filter(
    (item) => item.complete,
  ).length;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="publishing-card publishing-fade-up group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/25 hover:bg-white/[0.065] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_110px_rgba(0,0,0,0.32)]"
      style={{
        animationDelay: `${170 + index * 90}ms`,
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
        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full ${accentGlow(
          release.accent,
        )} blur-[82px] transition-all duration-700 group-hover:scale-110`}
      />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="publishing-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.065] to-transparent opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_0.72fr]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/45 backdrop-blur-xl">
              {release.id}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${statusStyle(
                release.status,
              )}`}
            >
              {release.status}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
              {release.channel}
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white">
            {release.title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            {release.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Version", value: release.version },
              { label: "Platform", value: release.platform },
              { label: "Build Size", value: release.size },
              {
                label: "Checklist",
                value: `${completedItems}/${release.checklist.length}`,
              },
            ].map((item) => (
              <GlassPanel
                key={item.label}
                className="rounded-[1.35rem] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                  {item.label}
                </p>

                <p className="mt-3 text-sm font-semibold text-white/72">
                  {item.value}
                </p>
              </GlassPanel>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-white/38">Release readiness</p>

              <p className="text-sm font-semibold text-white">
                {release.completion}
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.08] shadow-inner">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${accentGradient(
                  release.accent,
                )} transition-all duration-1000`}
                style={{ width: release.completion }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Release Owner
              </p>

              <p className="mt-2 text-sm font-medium text-white/70">
                {release.owner}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Last Updated
              </p>

              <p className="mt-2 text-sm text-white/42">
                {release.updated}
              </p>
            </div>
          </div>
        </div>

        <GlassPanel className="rounded-[1.6rem] p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                Release Checklist
              </p>

              <p className="mt-2 text-sm text-white/38">
                Tasks required before distribution.
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
              {completedItems}/{release.checklist.length}
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {release.checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-[1.25rem] border border-white/[0.07] bg-black/[0.09] px-4 py-3"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                    item.complete
                      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                      : "border-white/10 bg-white/[0.04] text-white/25"
                  }`}
                >
                  {item.complete ? "✓" : "·"}
                </span>

                <span
                  className={`text-sm ${
                    item.complete ? "text-white/65" : "text-white/38"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
              Destinations
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {release.destinations.map((destination) => (
                <span
                  key={destination}
                  className="rounded-full border border-orange-300/10 bg-gradient-to-r from-orange-500/14 via-orange-400/[0.06] to-transparent px-3 py-1 text-xs text-orange-200/85"
                >
                  {destination}
                </span>
              ))}
            </div>
          </div>

          <button className="mt-6 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition duration-300 hover:scale-[1.01] hover:bg-orange-50">
            Open Release
          </button>
        </GlassPanel>
      </div>
    </article>
  );
}

export default function PublishingPage() {
  const [activeView, setActiveView] = useState("Release Pipeline");

  const filteredReleases = getFilteredReleases(activeView);

  const readyReleases = releases.filter(
    (release) => release.status === "Ready",
  ).length;

  const plannedReleases = releases.filter(
    (release) => release.status === "Planning",
  ).length;

  const publishedReleases = releases.filter(
    (release) => release.status === "Published",
  ).length;

  const incompleteAssets = storeAssets.filter(
    (asset) => asset.progress !== "100%",
  ).length;

  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <style>{`
            @keyframes publishingFadeUp {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes publishingTabIn {
              from {
                transform: scaleX(0.35);
                opacity: 0;
              }

              to {
                transform: scaleX(1);
                opacity: 1;
              }
            }

            @keyframes publishingSheen {
              from {
                transform: translateX(-20%) skewX(-18deg);
              }

              to {
                transform: translateX(340%) skewX(-18deg);
              }
            }

            @keyframes publishingAmbientFloat {
              0%, 100% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.55;
              }

              50% {
                transform: translate3d(-12px, -8px, 0) scale(1.08);
                opacity: 0.9;
              }
            }

            .publishing-fade-up {
              animation: publishingFadeUp 0.75s ease-out both;
            }

            .publishing-tab-in {
              animation: publishingTabIn 0.35s ease-out both;
            }

            .publishing-ambient-float {
              animation: publishingAmbientFloat 8s ease-in-out infinite;
            }

            .publishing-card:hover > .publishing-sheen,
            .publishing-glass:hover .publishing-sheen {
              animation: publishingSheen 1.15s ease-out both;
            }

            @media (prefers-reduced-motion: reduce) {
              .publishing-fade-up,
              .publishing-tab-in,
              .publishing-ambient-float,
              .publishing-card:hover > .publishing-sheen,
              .publishing-glass:hover .publishing-sheen {
                animation: none;
              }
            }
          `}</style>

          <div className="publishing-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-white/30">MatterBreak</p>

              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Publishing
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/42">
                Prepare builds, manage release requirements and keep every
                publishing destination connected to the project.
              </p>
            </div>

            <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
              New Release
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <div className="publishing-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl [animation-delay:80ms]">
            <div className="publishing-ambient-float pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-orange-500/[0.07] blur-3xl" />

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
                      <span className="publishing-tab-in absolute inset-x-5 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-orange-300 to-transparent shadow-[0_0_18px_rgba(251,146,60,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="publishing-fade-up relative mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl [animation-delay:140ms]">
            <div className="publishing-ambient-float pointer-events-none absolute -right-16 top-2 h-52 w-52 rounded-full bg-orange-500/[0.08] blur-3xl" />

            <div className="relative grid gap-4 xl:grid-cols-4">
              {[
                {
                  label: "Ready",
                  value: readyReleases,
                  detail: "Awaiting distribution",
                },
                {
                  label: "Planning",
                  value: plannedReleases,
                  detail: "Future releases",
                },
                {
                  label: "Published",
                  value: publishedReleases,
                  detail: "Completed builds",
                },
                {
                  label: "Asset Actions",
                  value: incompleteAssets,
                  detail: "Still needs work",
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

          {activeView === "Store Assets" ? (
            <div
              key={activeView}
              className="publishing-fade-up grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            >
              {storeAssets.map((asset) => (
                <GlassPanel
                  key={asset.label}
                  className="rounded-[2rem] p-6"
                >
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${accentGlow(
                      asset.accent,
                    )} blur-3xl`}
                  />

                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                      Store Asset
                    </p>

                    <h2 className="mt-4 text-xl font-semibold text-white">
                      {asset.label}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/38">
                      {asset.detail}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/48">
                        {asset.status}
                      </span>

                      <span className="text-sm font-semibold text-white">
                        {asset.progress}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${accentGradient(
                          asset.accent,
                        )}`}
                        style={{ width: asset.progress }}
                      />
                    </div>

                    <button className="mt-6 w-full rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-white/65 transition hover:border-orange-300/20 hover:bg-white hover:text-black">
                      Open Asset
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          ) : (
            <div
              key={activeView}
              className="publishing-fade-up grid gap-5"
            >
              {filteredReleases.map((release, index) => (
                <ReleaseCard
                  key={release.id}
                  release={release}
                  index={index}
                />
              ))}

              {filteredReleases.length === 0 && (
                <GlassPanel className="rounded-[2rem] border-dashed p-8">
                  <p className="text-lg font-semibold text-white">
                    No releases in this stage.
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                    New release plans matching this view will appear here.
                  </p>
                </GlassPanel>
              )}
            </div>
          )}
        </PreviewShell>
      </div>
    </main>
  );
}