"use client";

import {
  type MouseEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import Navbar from "@/components/landing/Navbar";
import PreviewShell from "@/components/preview/PreviewShell";

const conversations = [
  {
    id: "CHAT-024",
    title: "Beacon clarity analysis",
    category: "Playtest Analysis",
    updated: "12 minutes ago",
    active: true,
  },
  {
    id: "CHAT-023",
    title: "Material counter balancing",
    category: "Game Design",
    updated: "Yesterday",
    active: false,
  },
  {
    id: "CHAT-022",
    title: "LAN replication checklist",
    category: "Technical",
    updated: "Yesterday",
    active: false,
  },
  {
    id: "CHAT-021",
    title: "Publisher pitch outline",
    category: "Publishing",
    updated: "3 days ago",
    active: false,
  },
];

const suggestions = [
  {
    title: "Analyse Playtest #15",
    description:
      "Find repeated feedback, player confusion and high-priority actions.",
    icon: "◎",
    accent: "orange",
  },
  {
    title: "Review Sprint Health",
    description:
      "Summarise blocked work, deadlines and risks across the current sprint.",
    icon: "✓",
    accent: "blue",
  },
  {
    title: "Improve the GDD",
    description:
      "Find missing rules, unclear mechanics and outdated design decisions.",
    icon: "□",
    accent: "violet",
  },
  {
    title: "Prepare Release Notes",
    description:
      "Turn completed tasks and resolved bugs into a clean build summary.",
    icon: "↗",
    accent: "emerald",
  },
];

const insights = [
  {
    label: "Highest Risk",
    value: "Beacon clarity",
    detail: "Mentioned by 8 testers",
    accent: "red",
  },
  {
    label: "Positive Signal",
    value: "Material system",
    detail: "Average fun score 4.3",
    accent: "emerald",
  },
  {
    label: "Recommended Next",
    value: "UI feedback pass",
    detail: "Before Playtest #16",
    accent: "orange",
  },
];

const initialMessages = [
  {
    sender: "user",
    name: "Neville Vincent",
    text: "Analyse the latest MatterBreak playtest and tell me what the team should focus on before the next LAN test.",
    time: "15:42",
  },
  {
    sender: "assistant",
    name: "Game Dev OS AI",
    text: "Playtest #15 shows that the core material system is landing well, but beacon ownership remains the clearest usability risk. Players enjoyed team fights, yet several struggled to identify neutral, contested and captured states quickly.",
    time: "15:42",
  },
];

type Message = (typeof initialMessages)[number];

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

function accentGlow(accent: string) {
  if (accent === "blue") return "bg-blue-500/[0.08]";
  if (accent === "violet") return "bg-violet-500/[0.08]";
  if (accent === "emerald") return "bg-emerald-500/[0.08]";
  if (accent === "red") return "bg-red-500/[0.08]";

  return "bg-orange-500/[0.09]";
}

function accentText(accent: string) {
  if (accent === "blue") return "text-blue-200";
  if (accent === "violet") return "text-violet-200";
  if (accent === "emerald") return "text-emerald-200";
  if (accent === "red") return "text-red-200";

  return "text-orange-200";
}

function GlassPanel({ children, className = "" }: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const bounds = panel.getBoundingClientRect();

    panel.style.setProperty(
      "--panel-x",
      `${event.clientX - bounds.left}px`,
    );

    panel.style.setProperty(
      "--panel-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      className={`ai-glass group/panel relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:border-orange-300/20 hover:bg-white/[0.065] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--panel-x, 50%) var(--panel-y, 50%), rgba(255,255,255,0.075), transparent 62%)",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-400/[0.06] blur-3xl transition duration-700 group-hover/panel:scale-110 group-hover/panel:bg-orange-400/[0.1]" />

      <div className="ai-sheen pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover/panel:opacity-100" />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  function sendMessage() {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        sender: "user",
        name: "Neville Vincent",
        text: trimmedInput,
        time: "Now",
      },
      {
        sender: "assistant",
        name: "Game Dev OS AI",
        text: "I’ve added that request to the current MatterBreak context. In the finished product, this response would use connected tasks, bugs, playtests and project documents to produce a grounded recommendation.",
        time: "Now",
      },
    ]);

    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <Navbar />

      <div className="pt-24">
        <PreviewShell>
          <style>{`
            @keyframes aiFadeUp {
              from {
                opacity: 0;
                transform: translateY(18px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes aiSheen {
              from {
                transform: translateX(-20%) skewX(-18deg);
              }

              to {
                transform: translateX(340%) skewX(-18deg);
              }
            }

            @keyframes aiPulse {
              0%, 100% {
                opacity: 0.65;
                transform: scale(1);
              }

              50% {
                opacity: 1;
                transform: scale(1.12);
              }
            }

            @keyframes aiOrbit {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }

            .ai-fade-up {
              animation: aiFadeUp 0.75s ease-out both;
            }

            .ai-pulse {
              animation: aiPulse 4s ease-in-out infinite;
            }

            .ai-orbit {
              animation: aiOrbit 18s linear infinite;
            }

            .ai-glass:hover .ai-sheen {
              animation: aiSheen 1.15s ease-out both;
            }

            @media (prefers-reduced-motion: reduce) {
              .ai-fade-up,
              .ai-pulse,
              .ai-orbit,
              .ai-glass:hover .ai-sheen {
                animation: none;
              }
            }
          `}</style>

          <div className="ai-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-white/30">MatterBreak</p>

              <h1 className="mt-1 text-5xl font-bold tracking-tight text-white">
                AI Assistant
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/42">
                Ask questions across your project, analyse development data and
                turn scattered information into clear next steps.
              </p>
            </div>

            <button className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-[1.02] hover:bg-orange-50">
              New Conversation
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <div className="grid items-start gap-5 xl:grid-cols-[290px_minmax(0,1fr)]">
            <aside className="ai-fade-up space-y-5 [animation-delay:80ms]">
              <GlassPanel className="rounded-[2rem] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                      Conversations
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-white">
                      Recent Threads
                    </h2>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
                    {conversations.length}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`w-full rounded-[1.35rem] border p-4 text-left transition-all duration-300 ${
                        conversation.active
                          ? "border-orange-300/20 bg-gradient-to-r from-orange-500/18 via-orange-400/[0.08] to-transparent"
                          : "border-transparent bg-black/[0.08] hover:border-white/10 hover:bg-white/[0.05]"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          conversation.active
                            ? "text-orange-100"
                            : "text-white/65"
                        }`}
                      >
                        {conversation.title}
                      </p>

                      <p className="mt-2 text-xs text-white/30">
                        {conversation.category}
                      </p>

                      <p className="mt-3 text-[11px] text-white/22">
                        {conversation.updated}
                      </p>
                    </button>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel className="rounded-[2rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                  Connected Context
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    { label: "Tasks", value: "8" },
                    { label: "Bugs", value: "6" },
                    { label: "Playtests", value: "3" },
                    { label: "Documents", value: "6" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-[1.2rem] border border-white/[0.07] bg-black/[0.08] px-4 py-3"
                    >
                      <span className="text-sm text-white/42">
                        {item.label}
                      </span>

                      <span className="text-sm font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </aside>

            <div className="min-w-0 space-y-5">
              <GlassPanel className="ai-fade-up rounded-[2rem] p-6 [animation-delay:140ms]">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                      <div className="ai-pulse absolute inset-0 rounded-full bg-orange-500/[0.12] blur-xl" />

                      <div className="ai-orbit absolute inset-1 rounded-full border border-dashed border-orange-300/30" />

                      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-500/10 text-xl text-orange-200">
                        ✦
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-orange-200/60">
                        Project Intelligence
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        MatterBreak Copilot
                      </h2>

                      <p className="mt-2 text-sm text-white/38">
                        Using the current project workspace as context.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                      Context synced
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/45">
                      MatterBreak
                    </span>
                  </div>
                </div>
              </GlassPanel>

              <div className="ai-fade-up grid gap-4 md:grid-cols-2 xl:grid-cols-4 [animation-delay:200ms]">
                {suggestions.map((suggestion) => (
                  <GlassPanel
                    key={suggestion.title}
                    className="cursor-pointer rounded-[1.6rem] p-5"
                  >
                    <div
                      className={`pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full ${accentGlow(
                        suggestion.accent,
                      )} blur-3xl`}
                    />

                    <div className="relative">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-lg ${accentText(
                          suggestion.accent,
                        )}`}
                      >
                        {suggestion.icon}
                      </div>

                      <h3 className="mt-5 text-base font-semibold text-white">
                        {suggestion.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/35">
                        {suggestion.description}
                      </p>
                    </div>
                  </GlassPanel>
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                <GlassPanel className="ai-fade-up flex min-h-[620px] flex-col rounded-[2rem] p-6 [animation-delay:260ms]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                        Active Conversation
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white">
                        Beacon clarity analysis
                      </h2>
                    </div>

                    <button className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white/50 transition hover:border-orange-300/20 hover:text-orange-200">
                      Clear
                    </button>
                  </div>

                  <div className="flex-1 space-y-5 overflow-y-auto py-6">
                    {messages.map((message, index) => {
                      const isUser = message.sender === "user";

                      return (
                        <div
                          key={`${message.name}-${index}`}
                          className={`flex ${
                            isUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          <article
                            className={`max-w-[82%] rounded-[1.6rem] border p-5 ${
                              isUser
                                ? "border-orange-300/20 bg-gradient-to-br from-orange-500/18 via-orange-400/[0.08] to-transparent"
                                : "border-white/10 bg-black/[0.1]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-6">
                              <p
                                className={`text-xs font-semibold ${
                                  isUser
                                    ? "text-orange-200"
                                    : "text-white/55"
                                }`}
                              >
                                {message.name}
                              </p>

                              <p className="text-[11px] text-white/22">
                                {message.time}
                              </p>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-white/62">
                              {message.text}
                            </p>

                            {!isUser && (
                              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                {[
                                  "Improve beacon states",
                                  "Run UI readability test",
                                  "Link findings to tasks",
                                ].map((item) => (
                                  <button
                                    key={item}
                                    className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-left text-xs text-white/42 transition hover:border-orange-300/20 hover:text-orange-200"
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            )}
                          </article>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/[0.12] p-2 backdrop-blur-xl focus-within:border-orange-300/25">
                      <textarea
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            !event.shiftKey
                          ) {
                            event.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Ask about tasks, bugs, playtests or project decisions..."
                        rows={3}
                        className="w-full resize-none bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25"
                      />

                      <div className="flex items-center justify-between gap-4 px-2 pb-1">
                        <div className="flex gap-2">
                          <button className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/38 transition hover:text-white">
                            Attach
                          </button>

                          <button className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/38 transition hover:text-white">
                            Add context
                          </button>
                        </div>

                        <button
                          onClick={sendMessage}
                          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-orange-50"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassPanel>

                <aside className="ai-fade-up space-y-5 [animation-delay:320ms]">
                  <GlassPanel className="rounded-[2rem] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                      Live Insights
                    </p>

                    <div className="mt-5 space-y-3">
                      {insights.map((insight) => (
                        <div
                          key={insight.label}
                          className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-black/[0.09] p-4"
                        >
                          <div
                            className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full ${accentGlow(
                              insight.accent,
                            )} blur-2xl`}
                          />

                          <div className="relative">
                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                              {insight.label}
                            </p>

                            <p className="mt-3 text-sm font-semibold text-white">
                              {insight.value}
                            </p>

                            <p className="mt-2 text-xs text-white/32">
                              {insight.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassPanel>

                  <GlassPanel className="rounded-[2rem] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                      Suggested Actions
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        "Create three UI tasks",
                        "Link Playtest #15",
                        "Update the GDD",
                        "Prepare Playtest #16",
                      ].map((action, index) => (
                        <button
                          key={action}
                          className="flex w-full items-center gap-3 rounded-[1.2rem] border border-white/[0.07] bg-black/[0.08] px-4 py-3 text-left transition hover:border-orange-300/20 hover:bg-white/[0.05]"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange-300/15 bg-orange-500/10 text-xs text-orange-200">
                            {index + 1}
                          </span>

                          <span className="text-sm text-white/48">
                            {action}
                          </span>
                        </button>
                      ))}
                    </div>
                  </GlassPanel>

                  <GlassPanel className="rounded-[2rem] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/25">
                      AI Usage
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-3xl font-semibold text-white">
                          62%
                        </p>

                        <p className="mt-2 text-xs text-white/30">
                          Monthly context allowance
                        </p>
                      </div>

                      <span className="rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                        Healthy
                      </span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300" />
                    </div>
                  </GlassPanel>
                </aside>
              </div>
            </div>
          </div>
        </PreviewShell>
      </div>
    </main>
  );
}