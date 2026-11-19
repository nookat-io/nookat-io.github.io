import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { ISSUES_URL } from "@/lib/github";
import { TextLink } from "./ui";

const code =
  "rounded bg-paper-3 px-1.5 py-0.5 font-mono text-[13.5px] text-ink";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Do I need Docker installed?",
    a: (
      <>
        You need a container engine; Nookat is the app on top of it. It connects
        to Docker Engine, Colima or Lima over the Docker API and honors{" "}
        <code className={code}>DOCKER_HOST</code> and Docker contexts. On a Mac
        with no engine, Nookat can install Colima through Homebrew and start it
        for you.
      </>
    ),
  },
  {
    q: "Can I keep using the command line?",
    a: "Yes. Nookat talks to the same engine as your terminal, so a container you start with docker run shows up in the app as it happens, and anything you change in the app is visible to the CLI.",
  },
  {
    q: "Which platforms are supported?",
    a: "macOS 11 Big Sur or later as one universal build for Apple silicon and Intel. Windows 10 or later on x64, as a setup .exe or an .msi. Linux on x86_64 and ARM64, as an AppImage, .deb or .rpm.",
  },
  {
    q: "macOS says Nookat can't be opened. What now?",
    a: (
      <>
        Nookat isn't notarized with an Apple Developer ID yet, so macOS asks
        once. Right-click Nookat in Applications and choose Open, or go to
        System Settings, Privacy & Security, and click Open Anyway. After that
        it opens normally.
      </>
    ),
  },
  {
    q: "Is it really free?",
    a: "Yes. Nookat is Apache-2.0, free for personal and commercial use, with no account, no paid tier and no feature held back.",
  },
  {
    q: "Does Nookat collect any data?",
    a: "Only if you opt in. Settings has two switches, both off by default: anonymous usage statistics (which screen was opened, and the app version) and crash reports. Turn either on to help, or leave them off.",
  },
  {
    q: "How can I help?",
    a: (
      <>
        Open an issue with a bug or an idea, send a pull request, or improve the
        docs. The README covers a development build.{" "}
        <TextLink href={ISSUES_URL} className="text-ink">
          GitHub issues
        </TextLink>
      </>
    ),
  },
];

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center gap-4 py-5 text-left"
        >
          <span
            className={cn(
              "flex-1 text-[17px] font-medium tracking-[-0.015em] transition-colors md:text-[18px]",
              open ? "text-ink" : "text-ink/80 group-hover:text-ink",
            )}
          >
            {q}
          </span>
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300",
              open
                ? "rotate-45 border-ink bg-ink text-white"
                : "border-line-2 text-muted group-hover:border-ink/40",
            )}
          >
            <Plus className="size-4" strokeWidth={2} />
          </span>
        </button>
      </h3>
      <div
        id={id}
        role="region"
        aria-label={q}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="max-w-[44rem] pb-6 pr-12 text-[16px] leading-[1.7] text-muted">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-24">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2
                id="faq-title"
                className="display text-[clamp(2.1rem,4.6vw,3.5rem)] text-ink"
              >
                Questions and Answers
              </h2>
              <p className="mt-5 max-w-[26rem] text-[16px] leading-[1.6] text-muted">
                The things people ask before they install a new tool next to one
                they rely on.
              </p>
            </div>
          </div>
          <div className="border-t border-line lg:col-span-7">
            {FAQS.map((f, i) => (
              <Item
                key={f.q}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
