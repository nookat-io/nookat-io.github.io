import { useState, type ReactNode } from "react";
import { Play, Square } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Action, Container, Image } from "./model";
import { AppButton, PageHeader, Tag } from "./parts";

export type SettingsTab = "general" | "engine" | "proxy";

function Card({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-app-line bg-white/[0.015] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[13.5px] font-semibold text-app-text">{title}</h4>
          {description && (
            <p className="mt-0.5 text-[12px] text-app-muted">{description}</p>
          )}
        </div>
        {badge}
      </div>
      <div className="mt-3.5">{children}</div>
    </section>
  );
}

function Switch({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <p className="text-[12.5px] font-medium text-app-text">{label}</p>
        {description && (
          <p className="text-[12px] text-app-muted">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:opacity-40",
          checked ? "bg-blue" : "bg-white/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-4 rounded-full bg-white shadow transition-[left] duration-200",
            checked ? "left-[18px] bg-ink" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11.5px] text-app-faint">{label}</dt>
      <dd className="truncate font-mono text-[12.5px] tabular-nums text-app-text">
        {value}
      </dd>
    </div>
  );
}

export function SettingsView({
  tab,
  onTab,
  containers,
  images,
  engineRunning,
  version,
  dispatch,
}: {
  tab: SettingsTab;
  onTab: (t: SettingsTab) => void;
  containers: Container[];
  images: Image[];
  engineRunning: boolean;
  version: string | null;
  dispatch: (a: Action) => void;
}) {
  const [usage, setUsage] = useState(false);
  const [crash, setCrash] = useState(false);
  const [boot, setBoot] = useState(false);
  const [tray, setTray] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  const count = (s: Container["state"]) =>
    containers.filter((c) => c.state === s).length;

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure Docker engine and application preferences"
      />
      <div
        role="tablist"
        aria-label="Settings sections"
        className="flex gap-1 px-4 pt-4 sm:px-5"
      >
        {(
          [
            ["general", "General"],
            ["engine", "Engine"],
            ["proxy", "Proxy"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={cn(
              "h-8 rounded-md px-3 text-[12.5px] font-medium transition-colors",
              tab === id
                ? "bg-app-raise text-app-text"
                : "text-app-muted hover:text-app-text",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 px-4 pb-5 pt-4 sm:px-5 lg:grid-cols-2">
        {tab === "general" && (
          <>
            <Card title="Language">
              <p className="text-[12px] text-app-muted">Interface Language</p>
              <div className="mt-1.5 flex h-8 items-center rounded-md border border-app-line bg-app-side px-2.5 text-[12.5px] text-app-text">
                English
              </div>
            </Card>
            <Card title="Usage Statistics">
              <Switch
                label="Send anonymous usage statistics"
                description="Help improve Nookat by sending anonymous usage data"
                checked={usage}
                onChange={setUsage}
              />
              <Switch
                label="Crash reporting"
                description="Send crash reports to help improve stability"
                checked={crash}
                onChange={setCrash}
              />
            </Card>
            <Card title="Startup Settings">
              <Switch
                label="Start Nookat on system boot"
                checked={boot}
                onChange={setBoot}
              />
              <Switch
                label="Minimize to system tray"
                checked={tray}
                onChange={setTray}
              />
              <Switch
                label="Check for updates"
                checked={updates}
                onChange={setUpdates}
              />
              <Switch
                label="Automatic updates"
                checked={autoUpdate}
                onChange={setAutoUpdate}
              />
              {version && (
                <p className="pt-1 text-[12px] text-app-muted">
                  Current version: <Tag>{version}</Tag>
                </p>
              )}
            </Card>
          </>
        )}

        {tab === "engine" && (
          <>
            <Card
              title="Engine Status"
              description="Current engine information and status overview"
              badge={
                <Tag tone={engineRunning ? "live" : "muted"}>
                  {engineRunning ? "Running" : "Stopped"}
                </Tag>
              }
            >
              <dl className="grid grid-cols-4 gap-3 border-b border-app-line/70 pb-3.5">
                <Fact
                  label="Running"
                  value={engineRunning ? count("running") : 0}
                />
                <Fact
                  label="Paused"
                  value={engineRunning ? count("paused") : 0}
                />
                <Fact
                  label="Stopped"
                  value={engineRunning ? count("exited") : 0}
                />
                <Fact label="Images" value={images.length} />
              </dl>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-3.5">
                <Fact label="Engine Version" value="27.4.0" />
                <Fact label="API Version" value="1.47" />
                <Fact label="Storage Driver" value="overlay2" />
                <Fact label="Architecture" value="aarch64" />
                <Fact label="Operating System" value="Ubuntu 24.04.1 LTS" />
                <Fact label="Kernel Version" value="6.8.0-50-generic" />
              </dl>
            </Card>
            <Card
              title="Engine Configuration"
              description="Colima, managed by Nookat on macOS"
            >
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <Fact label="CPU Cores" value={4} />
                <Fact label="Memory (GB)" value={8} />
                <Fact label="Disk (GB)" value={100} />
                <Fact label="Architecture" value="aarch64" />
              </dl>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-app-line/70 pt-3.5">
                <p className="text-[12px] text-app-muted">Engine Actions</p>
                {engineRunning ? (
                  <AppButton
                    icon={Square}
                    onClick={() =>
                      dispatch({ type: "engine/set", running: false })
                    }
                  >
                    Stop Engine
                  </AppButton>
                ) : (
                  <AppButton
                    variant="primary"
                    icon={Play}
                    onClick={() =>
                      dispatch({ type: "engine/set", running: true })
                    }
                  >
                    Start Engine
                  </AppButton>
                )}
              </div>
            </Card>
          </>
        )}

        {tab === "proxy" && (
          <>
            <Card
              title="HTTP/HTTPS Proxy"
              badge={<Tag tone="muted">Not available right now</Tag>}
            >
              <AppButton disabled>Test Connection</AppButton>
            </Card>
            <Card
              title="Proxy Authentication"
              badge={<Tag tone="muted">Not available right now</Tag>}
            >
              <AppButton disabled>Save Settings</AppButton>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
