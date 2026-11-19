import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { LATEST_RELEASE_URL, RELEASES_URL, useGitHub } from "@/lib/github";
import {
  type OS,
  PLATFORMS,
  formatHint,
  formatLabel,
  formatSize,
  installersFor,
  osLabel,
  primaryInstaller,
  useVisitor,
} from "@/lib/downloads";
import { PrimaryButton, TextLink, externalProps } from "./ui";

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.37 12.73c-.02-2.1 1.72-3.12 1.8-3.17-.98-1.43-2.5-1.63-3.04-1.65-1.29-.13-2.53.76-3.18.76-.66 0-1.67-.74-2.75-.72-1.41.02-2.72.82-3.44 2.09-1.47 2.55-.38 6.32 1.05 8.39.7 1.01 1.53 2.15 2.62 2.11 1.05-.04 1.45-.68 2.72-.68 1.27 0 1.63.68 2.74.66 1.13-.02 1.85-1.03 2.54-2.05.8-1.17 1.13-2.31 1.15-2.37-.03-.01-2.2-.85-2.21-3.37ZM14.29 6.55c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.53.62-1 1.61-.88 2.56.93.07 1.88-.47 2.46-1.16Z" />
    </svg>
  );
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 5.1 10.4 4v7.1H3V5.1Zm0 13.8V12.9h7.4V20L3 18.9ZM11.3 3.9 21 2.5v8.6h-9.7V3.9Zm0 16.2v-7.2H21v8.6l-9.7-1.4Z" />
    </svg>
  );
}

function LinuxLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path
        d="m7 10 3 2.5L7 15M12.5 15.5H17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<OS, typeof AppleLogo> = {
  macos: AppleLogo,
  windows: WindowsLogo,
  linux: LinuxLogo,
};

export function DownloadSection() {
  const visitor = useVisitor();
  const gh = useGitHub();
  const [chosen, setChosen] = useState<OS | null>(null);
  const os = chosen ?? visitor.os ?? "macos";
  const release = gh.status === "ready" ? gh.data.release : null;
  const installers = installersFor(release, os);
  const primary = primaryInstaller(
    installers,
    visitor.os === os ? visitor.arch : null,
  );
  const others = installers.filter((i) => i !== primary);
  const platform = PLATFORMS.find((p) => p.id === os)!;
  const Icon = ICONS[os];

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="on-dark bg-navy py-20 text-on-navy md:py-24"
    >
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-6">
          <h2
            id="download-title"
            className="display text-[clamp(2.6rem,6vw,4.6rem)] text-on-navy"
          >
            Take the weight off<span className="text-blue">.</span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-[1.6] text-on-navy-muted">
            Download Nookat, point it at your engine, and get back to work.
            Free, open source, and yours to keep.
          </p>
          {release && (
            <p className="mt-6 text-[14px] text-on-navy-faint">
              Latest release{" "}
              <a
                href={release.url}
                {...externalProps(release.url)}
                className="font-mono text-on-navy underline decoration-white/25 underline-offset-4 hover:decoration-blue"
              >
                {release.tag}
              </a>
            </p>
          )}
        </div>

        <div className="lg:col-span-6">
          <div
            role="group"
            aria-label="Choose your platform"
            className="grid grid-cols-3 gap-1 rounded-xl bg-black/25 p-1"
          >
            {PLATFORMS.map((p) => {
              const PIcon = ICONS[p.id];
              const active = p.id === os;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setChosen(p.id)}
                  className={cn(
                    "flex h-12 items-center justify-center gap-2 rounded-lg text-[15px] font-medium transition-colors",
                    active
                      ? "bg-navy-2 text-on-navy shadow-[inset_0_0_0_1px_rgba(20,148,242,0.5)]"
                      : "text-on-navy-muted hover:text-on-navy",
                  )}
                >
                  <PIcon className={cn("size-4", active && "text-blue")} />
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <PrimaryButton
              href={primary?.url ?? LATEST_RELEASE_URL}
              tone="blue"
              trailing="none"
              className="h-auto min-h-14 w-full flex-wrap justify-between gap-x-4 gap-y-1 px-5 py-3 text-[16px] font-semibold"
            >
              <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
                <Icon className="size-5" />
                Download for {osLabel(os)}
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[13px] font-medium text-white/80 tabular-nums">
                {primary ? (
                  <>
                    {formatLabel(primary)} · {formatSize(primary.size)}
                  </>
                ) : (
                  "GitHub Releases"
                )}
                {primary ? (
                  <ArrowDownToLine
                    className="size-4 text-white"
                    strokeWidth={2.2}
                  />
                ) : (
                  <ArrowUpRight
                    className="size-4 text-white"
                    strokeWidth={2.2}
                  />
                )}
              </span>
            </PrimaryButton>
            <p className="mt-2.5 text-[13.5px] text-on-navy-faint">
              {platform.requirement}
            </p>
          </div>

          {others.length > 0 && (
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {others.map((i) => (
                <li key={i.name}>
                  <a
                    href={i.url}
                    className="group flex items-center gap-4 py-3.5 text-[15px] transition-colors"
                  >
                    <span className="flex-1">
                      <span className="font-medium text-on-navy group-hover:text-blue">
                        {formatLabel(i)}
                      </span>
                      {formatHint(i) && (
                        <span className="ml-2 text-[13.5px] text-on-navy-faint">
                          {formatHint(i)}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[13px] text-on-navy-muted tabular-nums">
                      {formatSize(i.size)}
                    </span>
                    <ArrowDownToLine
                      className="size-4 text-on-navy-faint transition-colors group-hover:text-blue"
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {os === "macos" && (
            <div className="mt-6 flex gap-3 rounded-xl bg-white/[0.05] p-4 text-[14px] leading-relaxed text-on-navy-muted">
              <Info
                className="mt-0.5 size-4 shrink-0 text-blue"
                strokeWidth={2}
              />
              <p>
                <span className="font-medium text-on-navy">
                  First launch on macOS:
                </span>{" "}
                Nookat isn't notarized by Apple yet, so macOS asks once.
                Right-click the app in Applications and choose Open, or click
                Open Anyway in System Settings, Privacy & Security.
              </p>
            </div>
          )}

          <p className="mt-6 text-[14px]">
            <TextLink href={RELEASES_URL} className="text-on-navy">
              All releases and release notes
            </TextLink>
          </p>
        </div>
      </div>
    </section>
  );
}
