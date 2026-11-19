import { LATEST_RELEASE_URL, REPO_URL, useGitHub } from "@/lib/github";
import { formatLabel, formatSize, osLabel, useOffer } from "@/lib/downloads";
import { AppPreview } from "./app-preview/AppPreview";
import { GithubMark, PrimaryButton, SecondaryButton } from "./ui";

function HeroDownload() {
  const { os, installer, version, loading, visitor } = useOffer();

  if (visitor.mobile) {
    return (
      <>
        <div className="flex flex-wrap gap-2.5">
          <PrimaryButton href="#download">Get Nookat for desktop</PrimaryButton>
        </div>
        <p className="mt-3 text-[14px] text-faint">
          For macOS, Windows and Linux.
        </p>
      </>
    );
  }

  const href = installer?.url ?? LATEST_RELEASE_URL;
  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        <PrimaryButton href={href} trailing={installer ? "arrow" : "external"}>
          Download for {osLabel(os)}
        </PrimaryButton>
        <SecondaryButton href={REPO_URL}>
          <GithubMark className="size-4" />
          View source
        </SecondaryButton>
      </div>
      <p className="mt-3 flex min-h-[1.5em] flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-faint">
        {installer && version ? (
          <span className="whitespace-nowrap font-mono text-[13px] tabular-nums">
            v{version} · {formatLabel(installer)} · {formatSize(installer.size)}
          </span>
        ) : loading ? (
          <span
            aria-hidden="true"
            className="inline-block h-3 w-56 rounded bg-paper-3 align-middle"
          />
        ) : (
          <span>Latest installers on GitHub Releases</span>
        )}
        <span className="hidden text-dim sm:inline" aria-hidden="true">
          /
        </span>
        <a
          href="#download"
          className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          Other platforms
        </a>
      </p>
    </>
  );
}

export function Hero() {
  const gh = useGitHub();
  const version =
    gh.status === "ready" ? (gh.data.release?.version ?? null) : null;
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <div className="wrap relative pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1
            id="hero-title"
            className="display text-[clamp(2.9rem,7.4vw,5rem)] lg:col-span-7"
          >
            Containers,
            <br />
            minus the weight<span className="text-blue">.</span>
          </h1>
          <div className="lg:col-span-5 lg:pb-3">
            <p className="max-w-120 text-[17px] leading-[1.6] text-muted md:text-[18px]">
              Nookat is a small Docker-compatible native app for the containers,
              images, volumes and networks on your machine.
            </p>
            <div className="mt-7">
              <HeroDownload />
            </div>
          </div>
        </div>

        <div id="preview" className="mt-12 scroll-mt-24 md:mt-16">
          <AppPreview
            version={version}
            className="animate-rise [animation-delay:120ms]"
          />
        </div>
      </div>
    </section>
  );
}
