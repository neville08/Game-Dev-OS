import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const playtests = [
  {
    id: "#15",
    title: "LAN Balance Test",
    project: "MatterBreak",
    status: "Ready for Analysis",
    outcome: "Needs Review",
    outcomeStyle: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    build: "v0.4.2",
    date: "Saturday • 14:00",
    testers: "14",
    duration: "38 min",
    focus: "Beacon clarity, material balance and team fight readability.",
    lead: "Neville Vincent",
    notes: [
      { name: "Neville Vincent", note: "Beacon VFX needs stronger feedback." },
      { name: "Banuka Mendes", note: "Material respawn timing felt better." },
      { name: "Jittiwat Chada", note: "UI states need clearer team ownership." },
    ],
    scores: [
      { label: "Fun", value: "4.3" },
      { label: "Clarity", value: "3.1" },
      { label: "Balance", value: "3.8" },
    ],
  },
  {
    id: "#14",
    title: "Capture Flow Review",
    project: "MatterBreak",
    status: "AI Summary Ready",
    outcome: "Action Required",
    outcomeStyle: "bg-red-500/10 text-red-300 border-red-500/20",
    build: "v0.4.1",
    date: "Yesterday",
    testers: "9",
    duration: "31 min",
    focus: "Testing how quickly new players understand beacon control.",
    lead: "Banuka Mendes",
    notes: [
      { name: "Neville Vincent", note: "Players understood capture after round two." },
      { name: "Banuka Mendes", note: "Spawn distance helped reduce early pressure." },
      { name: "Jittiwat Chada", note: "Need better icon contrast in contested state." },
    ],
    scores: [
      { label: "Fun", value: "4.0" },
      { label: "Clarity", value: "2.9" },
      { label: "Balance", value: "3.6" },
    ],
  },
  {
    id: "#13",
    title: "Material Feedback Test",
    project: "MatterBreak",
    status: "Archived",
    outcome: "Approved",
    outcomeStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    build: "v0.3.9",
    date: "Last week",
    testers: "11",
    duration: "42 min",
    focus: "Checking if players understand material absorption and counters.",
    lead: "Jittiwat Chada",
    notes: [
      { name: "Neville Vincent", note: "Materials are fun but need stronger visuals." },
      { name: "Banuka Mendes", note: "Cooldown readability needs improvement." },
      { name: "Jittiwat Chada", note: "Counters should be introduced earlier." },
    ],
    scores: [
      { label: "Fun", value: "4.5" },
      { label: "Clarity", value: "3.0" },
      { label: "Balance", value: "3.4" },
    ],
  },
];

export default function PlaytestsPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-gray-500">MatterBreak</p>
              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                Playtests
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-400">
                Run weekly tests, collect structured feedback, capture developer
                notes and turn observations into tasks.
              </p>
            </div>

            <button className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:bg-orange-50">
              New Playtest
            </button>
          </div>

          <div className="mb-5 grid gap-5 xl:grid-cols-4">
            {[
              { label: "Active Sessions", value: "3" },
              { label: "Total Testers", value: "34" },
              { label: "Avg Fun Score", value: "4.3" },
              { label: "Open Actions", value: "12" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-[#181C22] p-5"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-5">
            {playtests.map((test) => (
              <article
                key={test.id}
                className="group rounded-3xl border border-white/10 bg-[#181C22] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#20252D] hover:shadow-xl hover:shadow-orange-500/5"
              >
                <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                        Playtest {test.id}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                        {test.status}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${test.outcomeStyle}`}
                      >
                        {test.outcome}
                      </span>

                      <span className="text-sm text-gray-500">
                        Lead: {test.lead}
                      </span>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                      {test.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {test.project} • {test.build} • {test.date}
                    </p>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400">
                      {test.focus}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-[#20252D] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          Testers
                        </p>
                        <p className="mt-2 text-2xl font-bold text-white">
                          {test.testers}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#20252D] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          Duration
                        </p>
                        <p className="mt-2 text-2xl font-bold text-white">
                          {test.duration}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#20252D] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          Action Items
                        </p>
                        <p className="mt-2 text-2xl font-bold text-white">4</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-[#20252D] p-5">
                    <p className="mb-4 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Feedback Scores
                    </p>

                    <div className="space-y-4">
                      {test.scores.map((score) => (
                        <div key={score.label}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-gray-300">
                              {score.label}
                            </span>
                            <span className="font-semibold text-white">
                              {score.value}/5
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-orange-500"
                              style={{
                                width: `${(Number(score.value) / 5) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-orange-300">
                        AI Summary
                      </p>
                      <p className="mt-2 text-sm leading-6 text-orange-100/80">
                        Players enjoyed the material system, but beacon
                        ownership and contested states need clearer feedback.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-[420px] group-hover:opacity-100">
                  <div className="border-t border-white/10 pt-5">
                    <p className="mb-4 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Developer Notes
                    </p>

                    <div className="grid gap-3 md:grid-cols-3">
                      {test.notes.map((note) => (
                        <div
                          key={note.name}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="text-sm font-semibold text-white">
                            {note.name}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-gray-500">
                            {note.note}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-orange-50">
                      Open Playtest Review
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