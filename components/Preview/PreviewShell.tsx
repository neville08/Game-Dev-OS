"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { icon: "⌂", label: "Home", href: "/preview" },
  { icon: "▣", label: "Projects", href: "/preview/projects" },
  { icon: "◉", label: "Playtests", href: "/preview/playtests" },
  { icon: "✓", label: "Tasks", href: "/preview/tasks" },
  { icon: "!", label: "Bugs", href: "/preview/bugs" },
  { icon: "□", label: "Docs", href: "/preview/docs" },
  { icon: "↗", label: "Publishing", href: "/preview/publishing" },
  { icon: "✦", label: "AI Assistant", href: "/preview/ai" },
];

interface PreviewShellProps {
  children: ReactNode;
}

export default function PreviewShell({ children }: PreviewShellProps) {
  const pathname = usePathname();

  return (
    <section className="relative px-4 pb-24 md:px-8">
      <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-[460px] max-w-6xl rounded-full bg-orange-500/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1640px] rounded-[2.25rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F1115]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
              <p className="text-sm font-semibold text-white">
                Game Dev OS
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Studio Workspace
            </p>
          </div>

          <div className="grid min-h-[720px] md:grid-cols-[290px_1fr]">
            <aside className="hidden border-r border-white/10 bg-[#11151B] p-6 md:block">
              <p className="mb-8 text-xs uppercase tracking-[0.25em] text-gray-500">
                Workspace
              </p>

              <nav className="space-y-3">
                {navItems.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-orange-500/15 text-orange-400"
                          : "text-gray-400 hover:bg-orange-500/10 hover:text-orange-400"
                      }`}
                    >
                      <span className="w-5 text-center">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            <div className="p-6 md:p-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}