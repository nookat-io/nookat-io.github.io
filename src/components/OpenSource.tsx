import { useState } from "react";
import { Check, Copy, Download, GitFork, Star, Users } from "lucide-react";
import { ISSUES_URL, REPO_URL, formatCount, useGitHub } from "@/lib/github";
import {
  GithubMark,
  PrimaryButton,
  SectionHead,
  TextLink,
  externalProps,
} from "./ui";

const TREE = [
  ["├─", "src/", "React and TypeScript interface"],
  ["├─", "src-tauri/", "Rust core and Docker API client"],
  ["└─", "LICENSE", "Apache-2.0"],
] as const;

const CLONE = "git clone https://github.com/nookat-io/nookat";

function CloneCommand() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CLONE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="on-dark flex items-center gap-3 rounded-[10px] bg-ink py-1.5 pl-4 pr-1.5">
      <code className="min-w-0 flex-1 py-1.5 font-mono text-[13px] leading-[1.6] text-on-navy [overflow-wrap:anywhere]">
        <span className="select-none text-blue">$ </span>
        {CLONE}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy clone command"}
        title={copied ? "Copied" : "Copy"}
        className="grid size-9 shrink-0 place-items-center rounded-md bg-white/10 text-on-navy transition-colors hover:bg-blue-strong hover:text-white"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

function RepoStats() {
  const gh = useGitHub();
  if (gh.status === "error" || (gh.status === "ready" && !gh.data.stats))
    return null;
  const stats = gh.status === "ready" ? gh.data.stats : null;
  const items = [
    { icon: Star, value: stats?.stars, label: "stars" },
    { icon: GitFork, value: stats?.forks, label: "forks" },
    { icon: Users, value: stats?.contributors, label: "contributors" },
    {
      icon: Download,
      value: stats?.installerDownloads,
      label: "installer downloads",
    },
  ].filter((i) => gh.status === "loading" || typeof i.value === "number");

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-5 py-4 text-[14px] text-muted md:px-6">
      {items.map(({ icon: Icon, value, label }) => (
        <li key={label} className="inline-flex items-center gap-2">
          <Icon className="size-4 text-faint" strokeWidth={1.9} />
          {typeof value === "number" ? (
            <span className="font-mono font-medium text-ink tabular-nums">
              {formatCount(value)}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="inline-block h-3 w-6 rounded bg-paper-3"
            />
          )}
          {label}
        </li>
      ))}
    </ul>
  );
}

export function OpenSource() {
  const gh = useGitHub();
  const release = gh.status === "ready" ? gh.data.release : null;
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-title"
      className="bg-paper-2 py-20 md:py-24"
    >
      <div className="wrap">
        <SectionHead
          id="open-source-title"
          title="Built in the open."
          lede="Every line of Nookat is on GitHub under Apache-2.0. Read it, build it, fork it, and use it at work without asking anyone."
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-6">
            <p className="text-[16px] leading-[1.65] text-muted">
              The app is a Rust core that talks to the engine through{" "}
              <span className="font-medium text-ink">bollard</span>, wrapped in
              Tauri, with a React and TypeScript interface. Issues,
              reproductions, docs fixes and pull requests are all welcome.
            </p>
            <div className="mt-7">
              <CloneCommand />
            </div>
            <p className="mt-6">
              <TextLink href={ISSUES_URL} className="text-[15px] text-ink">
                See what's being worked on
              </TextLink>
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[14px] border border-line bg-paper">
              <div className="flex items-center gap-2.5 px-5 py-4 md:px-6">
                <GithubMark className="size-5 text-ink" />
                <a
                  href={REPO_URL}
                  {...externalProps(REPO_URL)}
                  className="text-[16px] text-ink hover:underline hover:underline-offset-4"
                >
                  <span className="text-muted">nookat-io / </span>
                  <span className="font-semibold">nookat</span>
                </a>
                <span className="ml-1 rounded-full border border-line-2 px-2 py-0.5 text-[12px] font-medium text-muted">
                  Public
                </span>
              </div>
              <RepoStats />
              <ul className="border-t border-line bg-paper-2/60 px-5 py-4 font-mono text-[13px] leading-[1.9] md:px-6">
                {TREE.map(([glyph, name, note]) => (
                  <li key={name} className="flex gap-3">
                    <span className="shrink-0">
                      <span className="text-dim">{glyph} </span>
                      <span className="text-ink">{name}</span>
                    </span>
                    <span className="min-w-0 text-faint">{note}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-4 md:px-6">
                <PrimaryButton
                  href={REPO_URL}
                  trailing="external"
                  className="h-11 text-[14px]"
                >
                  <Star className="size-4" strokeWidth={2} />
                  Star on GitHub
                </PrimaryButton>
                {release && (
                  <TextLink href={release.url} className="text-[14px] text-ink">
                    Release notes for {release.tag}
                  </TextLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
