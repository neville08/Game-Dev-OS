export default function DashboardPreview() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#181C22] p-4 shadow-2xl shadow-black/40">
        <div className="rounded-2xl border border-white/10 bg-[#0F1115] p-6">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm text-gray-400">Current Project</p>
              <h2 className="text-2xl font-bold text-white">MatterBreak</h2>
            </div>

            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400">
              Build v0.4.2
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Sprint Progress", "68%", "Current milestone"],
              ["Open Tasks", "12", "5 in progress"],
              ["High Issues", "3", "Needs attention"],
              ["Latest Playtest", "Jun 30", "14 testers"],
            ].map(([label, value, detail]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-[#20252D] p-4"
              >
                <p className="text-sm text-gray-400">{label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{value}</p>
                <p className="mt-4 text-sm text-gray-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}