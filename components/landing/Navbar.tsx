export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0F1115]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white">
            G
          </div>

          <span className="text-sm font-semibold tracking-wide text-white">
            Game Dev OS
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#workflow">
            Workflow
          </a>
          <a className="transition hover:text-white" href="#roadmap">
            Roadmap
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-xl px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:block">
            Sign In
          </button>

          <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0F1115] transition hover:bg-gray-200">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}