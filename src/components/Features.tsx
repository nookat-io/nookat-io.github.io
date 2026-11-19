import type { ReactNode } from "react";
import {
  ChevronRight,
  Pause,
  Play,
  RotateCw,
  Search,
  Square,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHead } from "./ui";

function Feature({
  title,
  children,
  visual,
  className,
  tone = "panel",
}: {
  title: string;
  children: ReactNode;
  visual: ReactNode;
  className?: string;
  tone?: "panel" | "raised";
}) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col rounded-[14px] p-5 sm:p-6 md:p-7",
        tone === "panel" && "border border-white/10 bg-white/[0.025]",
        tone === "raised" && "border border-white/[0.06] bg-white/[0.06]",
        className,
      )}
    >
      <h3 className="text-[20px] font-semibold leading-snug tracking-[-0.025em] text-on-navy">
        {title}
      </h3>
      <p className="mt-2.5 max-w-[34rem] text-[15px] leading-[1.6] text-on-navy-muted">
        {children}
      </p>
      <div className="mt-auto pt-7" aria-hidden="true">
        {visual}
      </div>
    </article>
  );
}

const chip =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.04] px-2.5 text-[13px] font-medium text-on-navy";

function BulkBar() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[13px] font-medium text-on-navy-muted">
          3 selected
        </span>
        <span className={chip}>
          <Play className="size-3.5" strokeWidth={2} /> Start
        </span>
        <span className={chip}>
          <Square className="size-3.5" strokeWidth={2} /> Stop
        </span>
        <span className={chip}>
          <Pause className="size-3.5" strokeWidth={2} /> Pause
        </span>
        <span className={chip}>
          <RotateCw className="size-3.5" strokeWidth={2} /> Restart
        </span>
        <span className={cn(chip, "border-[#5a2a24] text-[#f2a297]")}>
          <Trash2 className="size-3.5" strokeWidth={2} /> Delete
        </span>
      </div>
      <ul className="mt-3 divide-y divide-white/10 border-t border-white/10 text-[13.5px]">
        {[
          ["storefront-web-1", "running"],
          ["storefront-api-1", "running"],
          ["storefront-db-1", "running"],
        ].map(([name, state]) => (
          <li key={name} className="flex items-center gap-3 py-2">
            <span className="grid size-4 place-items-center rounded-[4px] bg-blue text-white">
              <svg viewBox="0 0 12 12" className="size-2.5">
                <path
                  d="M2.5 6.2 5 8.5l4.5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <span className="flex-1 font-medium text-on-navy">{name}</span>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-green-light">
              <span className="size-1.5 rounded-full bg-green" />
              {state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LogsVisual() {
  return (
    <div className="overflow-hidden rounded-xl bg-app text-app-text">
      <div className="border-b border-app-line px-3.5 py-2.5 text-[12.5px] font-medium">
        Container Logs: storefront-api-1
      </div>
      <pre className="m-0 px-3.5 py-3 font-mono text-[12px] leading-[1.7] whitespace-pre-wrap text-app-text/80 [overflow-wrap:anywhere]">
        {`[info] database ready, 14 migrations applied
[info] listening on http://0.0.0.0:3000
[http] GET /api/products?page=1 200 18ms`}
      </pre>
      <div className="border-t border-app-line px-3.5 py-2.5 font-mono text-[12px] text-app-muted">
        <span className="text-blue">Terminal</span> runs docker exec -it
        storefront-api-1 bash
      </div>
    </div>
  );
}

function ComposeVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 text-[13.5px]">
      <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-2.5">
        <ChevronRight
          className="size-4 rotate-90 text-on-navy-muted"
          strokeWidth={2}
        />
        <span className="flex-1 font-semibold text-on-navy">storefront</span>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[12px] text-on-navy-muted">
          3 containers
        </span>
      </div>
      {["web-1", "api-1", "db-1"].map((n) => (
        <div
          key={n}
          className="flex items-center gap-2 border-t border-white/10 px-3 py-2 pl-9 text-on-navy-muted"
        >
          <span className="flex-1">storefront-{n}</span>
          <span className="size-1.5 rounded-full bg-green" />
        </div>
      ))}
    </div>
  );
}

function HubVisual() {
  return (
    <div>
      <div className="flex h-10 items-center gap-2 rounded-lg border border-blue/60 bg-black/20 px-3 text-[14px] text-on-navy shadow-[0_0_0_3px_rgba(20,148,242,0.16)]">
        <Search className="size-4 text-on-navy-muted" strokeWidth={2} />
        postgres
        <span className="ml-px h-4 w-px animate-blink bg-on-navy" />
      </div>
      <div className="mt-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13.5px] font-medium text-on-navy">
            postgres
          </span>
          <span className="rounded-md bg-blue-strong px-2 py-1 text-[12px] font-medium text-white">
            Pull
          </span>
        </div>
        <p className="mt-0.5 text-[12.5px] text-on-navy-muted">
          The PostgreSQL object-relational database
        </p>
      </div>
    </div>
  );
}

function ResourcesVisual() {
  return (
    <dl className="divide-y divide-white/10 rounded-xl border border-white/10 text-[13px]">
      {[
        ["storefront_pgdata", "/var/lib/docker/volumes/…"],
        ["storefront_default", "172.18.0.0/16"],
        ["bridge", "System"],
      ].map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between gap-3 px-3 py-2.5"
        >
          <dt className="shrink-0 font-medium text-on-navy">{k}</dt>
          <dd className="min-w-0 truncate font-mono text-[12px] text-on-navy-muted">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="on-dark bg-navy py-20 text-on-navy md:py-24"
    >
      <div className="wrap">
        <SectionHead
          id="features-title"
          tone="dark"
          title="Everyday container work, without the detours."
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <Feature
            className="md:col-span-7"
            title="Start, stop, pause, restart. One or twenty containers."
            visual={<BulkBar />}
          >
            Every lifecycle action sits in the row menu, and selecting several
            containers turns them into bulk actions. Prune Stopped clears out
            what has exited.
          </Feature>
          <Feature
            className="md:col-span-5"
            tone="raised"
            title="Logs and a shell, one click away."
            visual={<LogsVisual />}
          >
            Read a container's logs in place, then copy or download them.
            Terminal opens your own terminal app with a shell inside the
            container.
          </Feature>
          <Feature
            className="md:col-span-6 lg:col-span-4"
            title="Compose projects stay together."
            visual={<ComposeVisual />}
          >
            Containers from one Compose project fold into a single row you can
            start, stop or delete as a unit.
          </Feature>
          <Feature
            className="md:col-span-6 lg:col-span-4"
            title="Pull straight from Docker Hub."
            visual={<HubVisual />}
          >
            Search Docker Hub and pull without leaving the app. Filter in-use
            and dangling images, and prune what nothing needs.
          </Feature>
          <Feature
            className="md:col-span-12 lg:col-span-4"
            title="Volumes and networks in plain sight."
            visual={<ResourcesVisual />}
          >
            Mount points, drivers, subnets and gateways at a glance. Prune
            unused volumes; system networks are protected.
          </Feature>
        </div>
      </div>
    </section>
  );
}
