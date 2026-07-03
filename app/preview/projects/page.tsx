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
    team: [
      { initials: "NV", name: "Neville Vincent", role: "Game Designer" },
      { initials: "BM", name: "Banuka Mendes", role: "Gameplay Programmer" },
      { initials: "JC", name: "Jittiwat Chada", role: "Technical Designer" },
    ],
    sprintItems: ["Beacon UI", "Material Respawn", "Team Colours", "LAN Stability"],
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
    team: [{ initials: "NV", name: "Neville Vincent", role: "Solo Developer" }],
    sprintItems: ["Narrative Flow", "Lighting Pass", "Audio Triggers", "Final Build"],
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
    team: [
      { initials: "NV", name: "Neville Vincent", role: "Game Designer" },
      { initials: "??", name: "Unassigned", role: "Role needed" },
    ],
    sprintItems: ["Core Loop", "Player Roles", "Win Condition", "Prototype Scope"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-gray-500">Workspace</p>
              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Projects
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-400">
                See where every game stands, what your team is working on, and
                what needs attention next.
              </p>
            </div>

            <button className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:bg-orange-50">
              New Project
            </button>
          </div>

          <div className="grid items-start gap-5 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group relative rounded-3xl border border-white/10 bg-[#181C22] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#20252D] hover:shadow-xl hover:shadow-orange-500/5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/0 to-transparent transition duration-300 group-hover:via-orange-400/60" />

                <div className="mb-5 flex min-h-[150px] items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                        {project.status}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                        {project.stage}
                      </span>
                    </div>

                    <h2 className="max-w-[240px] text-3xl font-semibold leading-tight tracking-tight text-white">
                      {project.name}
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">{project.type}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-4xl font-bold text-white">
                      {project.progress}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Progress
                    </p>
                  </div>
                </div>

                <div className="mb-9 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-700"
                    style={{ width: project.progress }}
                  />
                </div>

                <div className="grid gap-4">
                  <div className="min-h-[148px] rounded-2xl border border-white/10 bg-[#20252D] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Current Focus
                    </p>
                    <p className="mt-4 text-sm font-semibold text-white">
                      {project.focus}
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                      Next: {project.next}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="min-h-[112px] rounded-2xl border border-white/10 bg-[#20252D] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Playtest
                      </p>
                      <p className="mt-4 text-sm font-semibold text-white">
                        {project.playtest}
                      </p>
                    </div>

                    <div className="min-h-[112px] rounded-2xl border border-white/10 bg-[#20252D] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Build
                      </p>
                      <p className="mt-4 text-sm font-semibold text-white">
                        {project.build}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex gap-1.5">
                    {project.team.map((member) => (
                      <div key={member.initials} className="group/member relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-xs font-semibold text-orange-300 transition duration-300 hover:bg-orange-500/20">
                          {member.initials}
                        </div>

                        <div className="pointer-events-none absolute bottom-11 left-0 z-30 w-56 rounded-2xl border border-white/10 bg-[#0B0D11] p-3 text-left opacity-0 shadow-2xl shadow-black/50 transition duration-300 group-hover/member:-translate-y-1 group-hover/member:opacity-100">
                          <p className="text-sm font-semibold text-white">
                            {member.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    Updated {project.updated}
                  </p>
                </div>

                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[360px] group-hover:opacity-100">
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Sprint Snapshot
                    </p>

                    <div className="space-y-2">
                      {project.sprintItems.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-sm"
                        >
                          <span className="text-gray-300">{item}</span>
                          <span
                            className={
                              index < 2 ? "text-orange-400" : "text-gray-500"
                            }
                          >
                            {index < 2 ? "Done" : "Open"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-orange-50">
                      Continue Working
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </PreviewShell>
      </div>
    </main>
  );
}