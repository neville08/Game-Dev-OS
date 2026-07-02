const roadmap = [
  {
    version: "v0.1",
    title: "Foundation",
    status: "In progress",
  },
  {
    version: "v0.2",
    title: "Authentication",
    status: "Next",
  },
  {
    version: "v0.3",
    title: "Projects",
    status: "Planned",
  },
  {
    version: "v0.4",
    title: "Playtests",
    status: "Planned",
  },
];

export default function RoadmapPreview() {
  return (
    <section id="roadmap" className="px-6 py-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#181C22] p-8 md:p-10">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-orange-400">Roadmap</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Built sprint by sprint.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Game Dev OS starts with the core workspace before expanding into
            authentication, projects, playtests, tasks, bugs, and AI.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {roadmap.map((item) => (
            <div
              key={item.version}
              className="rounded-2xl border border-white/10 bg-[#0F1115] p-5"
            >
              <p className="text-sm font-semibold text-orange-400">
                {item.version}
              </p>
              <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}