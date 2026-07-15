import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

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
    description:
      "The contested beacon indicator occasionally uses the local team colour instead of the opposing team colour on the client.",
    expected:
      "Every player should see their own team as blue and the opposing team as red, including contested beacon states.",
    actual:
      "The client occasionally sees the contested beacon indicator using the local blue team colour when it should display the opposing red state.",
    steps: [
      "Launch a LAN session with one host and one client.",
      "Assign the host and client to opposing teams.",
      "Move both players into the same beacon capture area.",
      "Allow the beacon to enter its contested state.",
      "Observe the beacon colour and ownership indicator on the client.",
    ],
    environment: [
      { label: "Engine", value: "Unreal Engine 5.6" },
      { label: "Network", value: "LAN · Listen Server" },
      { label: "Build", value: "MatterBreak v0.4.2" },
      { label: "Platform", value: "Windows 11" },
    ],
    notes: [
      {
        name: "Neville Vincent",
        time: "18 minutes ago",
        text: "The incorrect colour appears to be using the local player team ID before the contested state is evaluated.",
      },
      {
        name: "Jittiwat Chada",
        time: "12 minutes ago",
        text: "Confirmed on the client twice. The host view appears correct during the same test.",
      },
    ],
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
    description:
      "The host receives knockback correctly, but the movement appears late on the firing client's screen.",
    expected:
      "Knockback should appear immediately and consistently on both the host and client screens.",
    actual:
      "The host moves immediately, while the firing client sees the host react after a noticeable delay.",
    steps: [
      "Host a LAN match.",
      "Join from a second machine as the client.",
      "Fire the base pulse from the client at the host.",
      "Compare the knockback timing on both screens.",
    ],
    environment: [
      { label: "Engine", value: "Unreal Engine 5.6" },
      { label: "Network", value: "LAN · Listen Server" },
      { label: "Build", value: "MatterBreak v0.4.2" },
      { label: "Platform", value: "Windows 11" },
    ],
    notes: [
      {
        name: "Banuka Mendes",
        time: "45 minutes ago",
        text: "Checking whether the launch movement is replicated before the client receives the updated character state.",
      },
    ],
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
    description:
      "The material state updates correctly, but the world mesh occasionally remains visible until the respawn timer completes.",
    expected:
      "The pickup mesh should disappear immediately after a successful material absorption.",
    actual:
      "The player receives the material, but the pickup mesh remains visible and cannot be collected again.",
    steps: [
      "Start the MatterBreak prototype.",
      "Approach an available material pickup.",
      "Absorb the material.",
      "Repeat several times across different material locations.",
      "Observe whether the pickup mesh disappears.",
    ],
    environment: [
      { label: "Engine", value: "Unreal Engine 5.6" },
      { label: "Mode", value: "LAN Prototype" },
      { label: "Build", value: "MatterBreak v0.4.1" },
      { label: "Platform", value: "Windows 11" },
    ],
    notes: [],
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
    description:
      "The second player briefly appears white before the client-specific team visual is applied.",
    expected:
      "The character should spawn with the correct local blue or enemy red visual without showing a default material.",
    actual:
      "A white default material appears briefly before the replicated team colour is applied.",
    steps: [
      "Host a LAN match.",
      "Join from a second client.",
      "Observe the second player's material during initial spawn.",
      "Repeat after death and respawn.",
    ],
    environment: [
      { label: "Engine", value: "Unreal Engine 5.6" },
      { label: "Network", value: "LAN · Listen Server" },
      { label: "Build", value: "MatterBreak v0.4.1" },
      { label: "Platform", value: "Windows 11" },
    ],
    notes: [],
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
    description:
      "The underlying charge value changed correctly, but the HUD refresh happened before the ability state finished updating.",
    expected:
      "The pulse HUD should show the new charge value immediately after every shot.",
    actual:
      "The charge remained visually stuck at 10 even though the internal value had decreased.",
    steps: [
      "Start a match without holding a material.",
      "Fire the base pulse once.",
      "Observe the charge counter.",
    ],
    environment: [
      { label: "Engine", value: "Unreal Engine 5.6" },
      { label: "System", value: "Simple GAS" },
      { label: "Build", value: "MatterBreak v0.4.0" },
      { label: "Platform", value: "Windows 11" },
    ],
    notes: [
      {
        name: "Neville Vincent",
        time: "3 days ago",
        text: "Resolved by moving the HUD refresh to the end of the ability update sequence.",
      },
    ],
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
    description:
      "A velocity reset in the respawn sequence forced the character downward immediately after spawning.",
    expected:
      "The player should respawn at the selected PlayerStart with normal movement restored.",
    actual:
      "The character was forced downward immediately after the respawn sequence completed.",
    steps: [
      "Start a LAN match.",
      "Allow the player to reach zero health.",
      "Wait for the respawn sequence.",
      "Observe the character movement immediately after spawning.",
    ],
    environment: [
      { label: "Engine", value: "Unreal Engine 5.6" },
      { label: "System", value: "Death and Respawn" },
      { label: "Build", value: "MatterBreak v0.3.9" },
      { label: "Platform", value: "Windows 11" },
    ],
    notes: [
      {
        name: "Banuka Mendes",
        time: "Last week",
        text: "Removed the incorrect velocity reset from the respawn sequence.",
      },
    ],
  },
];

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
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  }

  if (status === "Review") {
    return "border-blue-400/20 bg-blue-500/10 text-blue-200";
  }

  if (status === "In Progress") {
    return "border-orange-400/20 bg-orange-500/10 text-orange-200";
  }

  return "border-white/10 bg-white/[0.06] text-white/55";
}

type BugDetailPageProps = {
  params: Promise<{
    bugId: string;
  }>;
};

export default async function BugDetailPage({
  params,
}: BugDetailPageProps) {
  const { bugId } = await params;

  const bug = bugs.find(
    (item) => item.id.toLowerCase() === bugId.toLowerCase(),
  );

  if (!bug) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <style>{`
            @keyframes reportFadeUp {
              from {
                opacity: 0;
                transform: translateY(16px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes reportDrift {
              0%, 100% {
                transform: translate3d(0, 0, 0) scale(1);
              }

              50% {
                transform: translate3d(-16px, 12px, 0) scale(1.08);
              }
            }

            .report-fade-up {
              animation: reportFadeUp 0.7s ease-out both;
            }

            .report-drift {
              animation: reportDrift 10s ease-in-out infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .report-fade-up,
              .report-drift {
                animation: none;
              }
            }
          `}</style>

          <div className="grid items-start gap-6 xl:grid-cols-[310px_minmax(0,1fr)]">
            {/* Bug navigator */}
            <aside className="report-fade-up xl:sticky xl:top-28">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
                <div className="report-drift pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/[0.08] blur-3xl" />

                <div className="relative">
                  <Link
                    href="/preview/bugs"
                    className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-orange-200"
                  >
                    <span>←</span>
                    Back to bug board
                  </Link>

                  <div className="mt-6 border-b border-white/10 pb-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                      MatterBreak
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-white">
                      Issue Navigator
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/35">
                      Move between reports without leaving the investigation
                      workspace.
                    </p>
                  </div>

                  <nav className="mt-4 space-y-2">
                    {bugs.map((item) => {
                      const active = item.id === bug.id;

                      return (
                        <Link
                          key={item.id}
                          href={`/preview/bugs/${item.id}`}
                          className={`block rounded-[1.35rem] border p-4 transition-all duration-300 ${
                            active
                              ? "border-orange-300/20 bg-orange-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                              : "border-transparent bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.055]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`text-xs font-semibold tracking-[0.14em] ${
                                active ? "text-orange-200" : "text-white/30"
                              }`}
                            >
                              {item.id}
                            </span>

                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                item.severity === "Critical"
                                  ? "bg-red-400"
                                  : item.severity === "High"
                                    ? "bg-orange-400"
                                    : "bg-amber-300"
                              }`}
                            />
                          </div>

                          <p
                            className={`mt-3 text-sm font-medium leading-5 ${
                              active ? "text-white" : "text-white/60"
                            }`}
                          >
                            {item.title}
                          </p>

                          <p className="mt-3 text-xs text-white/25">
                            {item.status}
                          </p>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main report */}
            <div className="min-w-0 space-y-6">
              <header className="report-fade-up relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_28px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-8">
                <div className="report-drift pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/[0.09] blur-[80px]" />

                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-red-500/[0.045] blur-[90px]" />

                <div className="relative">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                        {bug.id}
                      </p>

                      <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-4xl">
                        {bug.title}
                      </h1>

                      <p className="mt-5 max-w-3xl text-base leading-7 text-white/45">
                        {bug.description}
                      </p>
                    </div>

                    <button className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
                      Edit Report
                    </button>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl ${severityStyle(
                        bug.severity,
                      )}`}
                    >
                      {bug.severity}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl ${statusStyle(
                        bug.status,
                      )}`}
                    >
                      {bug.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/55 backdrop-blur-xl">
                      {bug.category}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/55 backdrop-blur-xl">
                      {bug.build}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/55 backdrop-blur-xl">
                      {bug.platform}
                    </span>
                  </div>
                </div>
              </header>

              {/* Ownership and source */}
              <section className="report-fade-up grid gap-4 md:grid-cols-2 xl:grid-cols-4 [animation-delay:80ms]">
                {[
                  { label: "Assigned", value: bug.assignee },
                  { label: "Reporter", value: bug.reporter },
                  { label: "Reproduction", value: bug.reproduction },
                  { label: "Linked Source", value: bug.source },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl"
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                      {item.label}
                    </p>

                    <p className="mt-3 text-sm font-medium leading-6 text-white/75">
                      {item.value}
                    </p>
                  </div>
                ))}
              </section>

              {/* Expected and actual */}
              <section className="report-fade-up grid gap-5 lg:grid-cols-2 [animation-delay:140ms]">
                <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/10 bg-emerald-500/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-emerald-400/[0.06] blur-3xl" />

                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/65">
                      Expected Result
                    </p>

                    <p className="mt-4 text-sm leading-7 text-white/55">
                      {bug.expected}
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-red-400/10 bg-red-500/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-red-400/[0.06] blur-3xl" />

                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200/65">
                      Actual Result
                    </p>

                    <p className="mt-4 text-sm leading-7 text-white/55">
                      {bug.actual}
                    </p>
                  </div>
                </div>
              </section>

              {/* Reproduction steps */}
              <section className="report-fade-up relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl [animation-delay:200ms]">
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/[0.055] blur-[80px]" />

                <div className="relative">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                        Investigation
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        Reproduction Steps
                      </h2>
                    </div>

                    <span className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
                      {bug.reproduction}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {bug.steps.map((step, index) => (
                      <div
                        key={step}
                        className="flex gap-4 rounded-[1.35rem] border border-white/[0.07] bg-black/[0.09] p-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-400/15 bg-orange-500/10 text-xs font-semibold text-orange-200">
                          {index + 1}
                        </div>

                        <p className="pt-1 text-sm leading-6 text-white/55">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Environment */}
              <section className="report-fade-up rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl [animation-delay:260ms]">
                <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                  Test Configuration
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Environment
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {bug.environment.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.35rem] border border-white/[0.07] bg-black/[0.09] p-4"
                    >
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                        {item.label}
                      </p>

                      <p className="mt-3 text-sm font-medium leading-6 text-white/70">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Evidence */}
              <section className="report-fade-up rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl [animation-delay:320ms]">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                      Evidence
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Screenshots and Clips
                    </h2>
                  </div>

                  <button className="w-fit rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-medium text-white/60 transition hover:border-orange-300/20 hover:text-orange-200">
                    Add Evidence
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="flex min-h-[180px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/[0.08]">
                    <div className="text-center">
                      <p className="text-sm font-medium text-white/55">
                        Client screenshot
                      </p>

                      <p className="mt-2 text-xs text-white/25">
                        Image placeholder
                      </p>
                    </div>
                  </div>

                  <div className="flex min-h-[180px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/[0.08]">
                    <div className="text-center">
                      <p className="text-sm font-medium text-white/55">
                        Reproduction clip
                      </p>

                      <p className="mt-2 text-xs text-white/25">
                        Video placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Team discussion */}
              <section className="report-fade-up rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl [animation-delay:380ms]">
                <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                  Collaboration
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Team Discussion
                </h2>

                <div className="mt-6 space-y-3">
                  {bug.notes.length > 0 ? (
                    bug.notes.map((note) => (
                      <article
                        key={`${note.name}-${note.time}`}
                        className="rounded-[1.5rem] border border-white/[0.07] bg-black/[0.09] p-5"
                      >
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <p className="text-sm font-semibold text-white">
                            {note.name}
                          </p>

                          <p className="text-xs text-white/25">{note.time}</p>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-white/50">
                          {note.text}
                        </p>
                      </article>
                    ))
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-black/[0.06] p-6">
                      <p className="text-sm font-medium text-white/55">
                        No discussion yet.
                      </p>

                      <p className="mt-2 text-sm text-white/30">
                        Team notes and investigation updates will appear here.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Add an investigation note..."
                    className="h-12 flex-1 rounded-full border border-white/10 bg-black/[0.12] px-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-orange-300/25"
                  />

                  <button className="h-12 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-orange-50">
                    Add Note
                  </button>
                </div>
              </section>
            </div>
          </div>
        </PreviewShell>
      </div>
    </main>
  );
}