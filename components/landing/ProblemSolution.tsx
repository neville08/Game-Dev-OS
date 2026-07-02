import Reveal from "./Reveal";

const scatteredTools = [
  "Google Docs",
  "Google Forms",
  "Discord",
  "Trello",
  "Google Sheets",
  "GitHub",
];

const gameDevOS = [
  "Projects",
  "Playtests",
  "Tasks",
  "Bug Tracker",
  "Builds",
  "Design Docs",
];

export default function ProblemSolution() {
  return (
    <section className="bg-[#050505] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold text-orange-400">
              Why Game Dev OS?
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Your workflow is everywhere.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/45">
              Indie game development shouldn&apos;t require six different apps.
              Bring projects, playtests, bugs, documentation and builds together
              in one connected workspace.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Reveal delay={220}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 shadow-2xl shadow-black/30">
              <p className="mb-6 text-sm font-medium text-white/40">
                Scattered Workflow
              </p>

              <div className="space-y-3">
                {scatteredTools.map((tool) => (
                  <div
                    key={tool}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 text-white/65"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="hidden text-center text-5xl text-orange-400 lg:block">
              →
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="rounded-3xl border border-orange-500/25 bg-orange-500/[0.08] p-8 shadow-2xl shadow-orange-500/10">
              <p className="mb-6 text-sm font-semibold text-orange-300">
                One Connected Workspace
              </p>

              <div className="space-y-3">
                {gameDevOS.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-orange-500/20 bg-black/30 px-5 py-4 text-white transition duration-300 hover:border-orange-400/40 hover:bg-orange-500/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}