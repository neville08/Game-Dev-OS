export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-400">
          Built for Indie Game Developers
        </span>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Game Dev OS
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-400">
          The operating system for indie game teams.
          Manage playtests, bugs, tasks, builds and design documents in one
          connected workspace.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400">
            Create Your Studio
          </button>

          <button className="rounded-xl border border-gray-700 px-6 py-3 font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}