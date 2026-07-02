const steps = [
  {
    number: "01",
    title: "Create your game project",
    description:
      "Set up a workspace for your game with its genre, engine, build version, team, and production status.",
  },
  {
    number: "02",
    title: "Run playtests",
    description:
      "Log each session with goals, tester notes, feedback categories, and issues found during the build.",
  },
  {
    number: "03",
    title: "Turn feedback into work",
    description:
      "Convert observations into tasks, bugs, and priorities so the team knows exactly what to fix next.",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-orange-400">
            Workflow
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            From playtest chaos to clear next steps.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-[#181C22] p-6"
            >
              <p className="text-sm font-semibold text-orange-400">
                {step.number}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}