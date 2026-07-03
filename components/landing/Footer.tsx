import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 pb-10 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 text-sm text-white/35 md:flex-row">
        <p>Game Dev OS</p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/preview"
            className="transition-colors duration-300 hover:text-white"
          >
            Launch Preview
          </Link>

          <Link
            href="#early-access"
            className="transition-colors duration-300 hover:text-white"
          >
            Early Access
          </Link>

          <span>Neville Vincent</span>
        </div>
      </div>
    </footer>
  );
}