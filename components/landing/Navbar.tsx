import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "Product", href: "#product" },
    { label: "Modules", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Roadmap", href: "#roadmap" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0F1115]/90 shadow-lg shadow-black/20 backdrop-blur-xl">
      <nav className="flex w-full items-center justify-between px-8 py-4 md:px-12 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-400/30 bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20">
            <div className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="text-lg font-black tracking-tight text-white">
              G
            </span>
          </div>

          <div className="leading-none">
            <p className="text-xl font-black tracking-tight text-white">
              Game Dev OS
            </p>
            <p className="mt-1 hidden text-[10px] uppercase tracking-[0.24em] text-orange-400/80 sm:block">
              Indie Studio System
            </p>
          </div>
        </Link>

        <div className="hidden items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1 text-sm font-medium text-gray-400 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-xl px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-xl border border-transparent px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-white/10 hover:bg-white/10 hover:text-white sm:block">
            Sign In
          </button>

          <button className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#0F1115] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-orange-400 hover:text-white">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}