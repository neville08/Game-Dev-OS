"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode, useRef } from "react";

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

type PreviewShellProps = {
  children: ReactNode;
};

function isRouteActive(pathname: string, href: string) {
  if (href === "/preview") {
    return pathname === "/preview";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PreviewShell({ children }: PreviewShellProps) {
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const bounds = shell.getBoundingClientRect();

    shell.style.setProperty(
      "--shell-x",
      `${event.clientX - bounds.left}px`,
    );

    shell.style.setProperty(
      "--shell-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1720px] px-3 pb-16 sm:px-5 lg:px-6">
      <style>{`
        @keyframes shellStatusPulse {
          0%, 100% {
            opacity: 0.72;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.16);
          }
        }

        @keyframes shellDriftOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-24px, 18px, 0) scale(1.1);
          }
        }

        @keyframes shellDriftTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(28px, -20px, 0) scale(1.08);
          }
        }

        @keyframes navSheen {
          from {
            transform: translateX(-30%) skewX(-18deg);
          }

          to {
            transform: translateX(380%) skewX(-18deg);
          }
        }

        .shell-status-dot {
          animation: shellStatusPulse 3.8s ease-in-out infinite;
        }

        .shell-drift-one {
          animation: shellDriftOne 12s ease-in-out infinite;
        }

        .shell-drift-two {
          animation: shellDriftTwo 15s ease-in-out infinite;
        }

        .nav-item:hover .nav-sheen {
          animation: navSheen 1.05s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .shell-status-dot,
          .shell-drift-one,
          .shell-drift-two,
          .nav-item:hover .nav-sheen {
            animation: none;
          }
        }
      `}</style>

      <div
        ref={shellRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_38px_120px_rgba(0,0,0,0.42)] backdrop-blur-3xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[#0F1115]/20" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(760px circle at var(--shell-x, 68%) var(--shell-y, 28%), rgba(249,115,22,0.17), transparent 66%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(420px circle at var(--shell-x, 68%) var(--shell-y, 28%), rgba(255,255,255,0.055), transparent 72%)",
          }}
        />

        <div className="shell-drift-one pointer-events-none absolute -right-40 -top-48 h-[620px] w-[620px] rounded-full bg-orange-500/[0.09] blur-[145px]" />

        <div className="shell-drift-two pointer-events-none absolute -bottom-52 -left-48 h-[580px] w-[580px] rounded-full bg-orange-900/[0.07] blur-[160px]" />

        <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0F1115]/82 backdrop-blur-3xl">
          <header className="relative flex min-h-[72px] items-center justify-between overflow-hidden border-b border-white/10 px-6">
            <div className="relative flex items-center gap-3">
              <div className="shell-status-dot h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.72)]" />

              <p className="text-sm font-semibold text-white">Game Dev OS</p>
            </div>

            <p className="relative hidden text-xs font-medium uppercase tracking-[0.24em] text-white/30 sm:block">
              Studio Workspace
            </p>
          </header>

          <div className="grid min-h-[760px] lg:grid-cols-[290px_minmax(0,1fr)]">
            {/* Navigator is inline — no component/import involved */}
            <aside className="relative hidden min-h-full overflow-hidden border-r border-white/10 bg-[#111319]/80 px-6 py-8 backdrop-blur-3xl lg:block">
              <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-orange-500/[0.05] blur-[90px]" />

              <div className="relative">
                <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-white/30">
                  Workspace
                </p>

                <nav className="space-y-3">
                  {navItems.map((item) => {
                    const active = isRouteActive(pathname, item.href);

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`nav-item group relative flex min-h-[58px] items-center gap-4 overflow-hidden rounded-[1.45rem] border px-4 py-3 text-sm font-medium transition-all duration-500 ${
                          active
                            ? "border-orange-300/20 bg-gradient-to-r from-orange-500/20 via-orange-400/[0.08] to-white/[0.015] text-orange-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_14px_40px_rgba(0,0,0,0.22)]"
                            : "border-transparent text-white/42 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.045] hover:text-white"
                        }`}
                      >
                        <div className="nav-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.055] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <span
                          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm ${
                            active
                              ? "border-orange-300/15 bg-orange-500/10 text-orange-100"
                              : "border-transparent text-white/40"
                          }`}
                        >
                          {item.icon}
                        </span>

                        <span className="relative">{item.label}</span>

                        {active && (
                          <span className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent shadow-[0_0_18px_rgba(251,146,60,0.8)]" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div className="relative min-w-0 overflow-hidden p-5 sm:p-7 xl:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-55"
                style={{
                  background:
                    "radial-gradient(680px circle at calc(var(--shell-x, 70%) - 290px) calc(var(--shell-y, 30%) - 72px), rgba(249,115,22,0.075), transparent 68%)",
                }}
              />

              <div className="relative z-10">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}