import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  LATEST_RELEASE_URL,
  REPO_URL,
  formatDate,
  useGitHub,
} from "@/lib/github";
import { GithubMark, Logo, externalProps } from "./ui";

const LINKS = [
  { label: "Preview", href: "#preview" },
  { label: "Features", href: "#features" },
  { label: "Open source", href: "#open-source" },
  { label: "FAQ", href: "#faq" },
];

function ReleaseRibbon() {
  const gh = useGitHub();
  const release = gh.status === "ready" ? gh.data.release : null;
  return (
    <div className="on-dark bg-ink text-[13px] text-on-navy-muted">
      <div className="wrap flex h-10 items-center justify-between gap-4">
        <p className="min-w-0 truncate">
          {release ? (
            <>
              <span className="mr-2 rounded-full bg-blue-strong px-2 py-0.5 font-mono text-[11.5px] font-medium text-white">
                {release.tag}
              </span>
              <span className="text-on-navy">
                Nookat {release.version} is out
              </span>
              <span className="hidden sm:inline">
                , released {formatDate(release.publishedAt)}
              </span>
            </>
          ) : (
            <span>Free and open source under Apache-2.0</span>
          )}
        </p>
        <a
          href={release?.url ?? LATEST_RELEASE_URL}
          {...externalProps(LATEST_RELEASE_URL)}
          className="group inline-flex shrink-0 items-center gap-1 font-medium text-on-navy transition-colors hover:text-blue"
        >
          Release notes
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <ReleaseRibbon />
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
          scrolled || open
            ? "border-line bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80"
            : "border-transparent bg-paper",
        )}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#top" aria-label="Nookat, back to top" className="shrink-0">
            <Logo />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={REPO_URL}
              {...externalProps(REPO_URL)}
              className="hidden h-10 items-center gap-2 rounded-[9px] border border-line-2 px-3.5 text-[14px] font-medium text-ink transition-colors hover:border-ink/35 hover:bg-paper-2 sm:inline-flex"
            >
              <GithubMark className="size-4" />
              GitHub
            </a>
            <a
              href="#download"
              className="inline-flex h-10 items-center rounded-[9px] bg-ink px-4 text-[14px] font-medium text-white transition-colors hover:bg-ink-2"
            >
              Download
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-[9px] border border-line-2 text-ink transition-colors hover:bg-paper-2 lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_24px_40px_-24px_rgba(16,20,27,0.3)] lg:hidden"
        >
          <nav aria-label="Mobile" className="wrap flex flex-col pb-4 pt-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[16px] font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href={REPO_URL}
              {...externalProps(REPO_URL)}
              className="mt-4 flex h-12 items-center justify-center gap-2 rounded-[10px] border border-line-2 text-[15px] font-medium text-ink"
            >
              <GithubMark className="size-4" /> View on GitHub
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
