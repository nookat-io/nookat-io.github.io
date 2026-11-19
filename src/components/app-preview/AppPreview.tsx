import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  Box,
  ChevronsLeft,
  Copy,
  Download,
  HardDrive,
  Layers,
  Network,
  Play,
  RefreshCw,
  RotateCcw,
  Settings,
  SunMoon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Glyph } from "@/components/ui";
import { ContainersView } from "./ContainersView";
import { ImagesView, NetworksView, VolumesView } from "./ResourceViews";
import { SettingsView, type SettingsTab } from "./SettingsView";
import {
  type Container,
  LOG_LINES,
  type View,
  initialState,
  reducer,
} from "./model";
import { AppButton, Sheet } from "./parts";

const NAV: { id: View; label: string; icon: typeof Box }[] = [
  { id: "containers", label: "Containers", icon: Box },
  { id: "images", label: "Images", icon: Layers },
  { id: "volumes", label: "Volumes", icon: HardDrive },
  { id: "networks", label: "Networks", icon: Network },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AppPreview({
  version,
  className,
}: {
  version: string | null;
  className?: string;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [view, setView] = useState<View>("containers");
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("general");
  const [collapsed, setCollapsed] = useState(false);
  const [logsFor, setLogsFor] = useState<Container | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const restart = (ids: string[]) => {
    dispatch({ type: "containers/set", ids, state: "restarting" });
    later(
      () => dispatch({ type: "containers/set", ids, state: "running" }),
      1100,
    );
  };

  const showToast = (message: string) => {
    setToast(message);
    later(() => setToast((t) => (t === message ? null : t)), 4200);
  };

  const closeLogs = useCallback(() => setLogsFor(null), []);
  const dirty = state !== initialState;
  const engineView = view === "settings";

  return (
    <figure className={cn("m-0", className)}>
      <div
        data-app-window
        className="on-dark relative overflow-hidden rounded-[14px] bg-app text-app-text shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(14,21,34,0.2),0_30px_60px_-28px_rgba(14,21,34,0.42)]"
      >
        {/* Title bar */}
        <div className="flex h-10 items-center border-b border-app-line bg-app-side px-3.5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center text-[12px] font-medium text-app-muted">
            Nookat
          </span>
          <span className="w-[52px]" />
        </div>

        <div className="flex h-[540px] md:h-[clamp(480px,46vw,560px)]">
          {/* Sidebar */}
          <aside
            className={cn(
              "hidden shrink-0 flex-col border-r border-app-line bg-app-side transition-[width] duration-300 md:flex",
              collapsed ? "w-[60px]" : "w-[196px]",
            )}
          >
            <div className="flex h-14 items-center gap-2.5 border-b border-app-line px-3.5">
              <Glyph className="size-7 shrink-0" />
              {!collapsed && (
                <span className="flex-1 truncate text-[14px] font-semibold tracking-[-0.03em]">
                  nookat
                </span>
              )}
              <button
                type="button"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                onClick={() => setCollapsed((c) => !c)}
                className={cn(
                  "grid size-6 place-items-center rounded text-app-faint hover:bg-white/[0.07] hover:text-app-text",
                  collapsed && "hidden",
                )}
              >
                <ChevronsLeft className="size-4" strokeWidth={2} />
              </button>
            </div>
            <nav
              aria-label="Preview navigation"
              className="flex flex-col gap-0.5 p-2.5"
            >
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                    onClick={() => setView(item.id)}
                    className={cn(
                      "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-[13px] font-medium transition-colors",
                      active
                        ? "bg-white/[0.08] text-app-text"
                        : "text-app-muted hover:bg-white/[0.04] hover:text-app-text",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        active ? "text-blue" : "text-app-faint",
                      )}
                      strokeWidth={1.9}
                    />
                    {!collapsed && item.label}
                  </button>
                );
              })}
            </nav>
            {collapsed && (
              <button
                type="button"
                aria-label="Expand sidebar"
                onClick={() => setCollapsed(false)}
                className="mx-auto mt-auto mb-3 grid size-8 place-items-center rounded-md text-app-faint hover:bg-white/[0.07] hover:text-app-text"
              >
                <ChevronsLeft className="size-4 rotate-180" strokeWidth={2} />
              </button>
            )}
          </aside>

          {/* Main */}
          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="flex h-14 shrink-0 items-center gap-3 border-b border-app-line px-3 sm:px-5">
              {/* Mobile navigation */}
              <nav
                aria-label="Preview navigation"
                className="no-scrollbar -mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 md:hidden"
              >
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const active = view === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-current={active ? "page" : undefined}
                      title={active ? undefined : item.label}
                      onClick={() => setView(item.id)}
                      className={cn(
                        "flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md text-[12.5px] font-medium",
                        active
                          ? "bg-white/[0.08] px-2.5 text-app-text"
                          : "w-8 text-app-muted hover:text-app-text sm:w-auto sm:px-2.5",
                      )}
                    >
                      <Icon
                        className={cn("size-3.5", active && "text-blue")}
                        strokeWidth={1.9}
                      />
                      <span className={cn(!active && "sr-only sm:not-sr-only")}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
              <div className="ml-auto flex shrink-0 items-center gap-3">
                <span className="flex items-center gap-2 text-[12.5px] text-app-muted">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      state.engineRunning
                        ? "bg-green shadow-[0_0_0_3px_rgba(34,197,94,0.16)]"
                        : "bg-app-faint",
                    )}
                  />
                  <span className="hidden sm:inline">
                    {state.engineRunning ? "Running" : "Not Running"}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="hidden size-8 place-items-center rounded-md text-app-faint sm:grid"
                >
                  <SunMoon className="size-4" strokeWidth={1.9} />
                </span>
              </div>
            </div>

            <div className="scroll-dark min-h-0 flex-1 overflow-auto">
              {!state.engineRunning && !engineView ? (
                <div className="grid h-full place-items-center px-6 text-center">
                  <div>
                    <p className="text-[15px] font-semibold text-app-text">
                      The engine is stopped
                    </p>
                    <p className="mx-auto mt-1 max-w-[300px] text-[12.5px] text-app-muted">
                      Nothing to show until a container engine is running.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <AppButton
                        variant="primary"
                        icon={Play}
                        onClick={() =>
                          dispatch({ type: "engine/set", running: true })
                        }
                      >
                        Start Engine
                      </AppButton>
                    </div>
                  </div>
                </div>
              ) : view === "containers" ? (
                <ContainersView
                  containers={state.containers}
                  dispatch={dispatch}
                  onRestart={restart}
                  onLogs={setLogsFor}
                  onTerminal={(c) =>
                    showToast(
                      `Opened your terminal: docker exec -it ${c.name} bash`,
                    )
                  }
                />
              ) : view === "images" ? (
                <ImagesView
                  images={state.images}
                  containers={state.containers}
                  dispatch={dispatch}
                />
              ) : view === "volumes" ? (
                <VolumesView
                  volumes={state.volumes}
                  containers={state.containers}
                  dispatch={dispatch}
                />
              ) : view === "networks" ? (
                <NetworksView networks={state.networks} dispatch={dispatch} />
              ) : (
                <SettingsView
                  tab={settingsTab}
                  onTab={setSettingsTab}
                  containers={state.containers}
                  images={state.images}
                  engineRunning={state.engineRunning}
                  version={version}
                  dispatch={dispatch}
                />
              )}
            </div>

            {logsFor && <LogsSheet container={logsFor} onClose={closeLogs} />}

            <div
              role="status"
              aria-live="polite"
              className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end sm:inset-x-5 sm:bottom-5"
            >
              {toast && (
                <p className="max-w-full rounded-lg border border-app-line bg-[#151a22] px-3.5 py-2.5 font-mono text-[12px] text-app-text shadow-[0_16px_32px_-12px_rgba(0,0,0,0.7)]">
                  {toast}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[13px] text-faint">
        {dirty && (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "reset" });
              setLogsFor(null);
              setToast(null);
            }}
            className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
          >
            <RotateCcw className="size-3.5" strokeWidth={2} />
            Reset preview
          </button>
        )}
      </figcaption>
    </figure>
  );
}

function LogsSheet({
  container,
  onClose,
}: {
  container: Container;
  onClose: () => void;
}) {
  const [lines, setLines] = useState(
    () => LOG_LINES[container.name] ?? ["(no output)"],
  );
  const [copied, setCopied] = useState(false);
  const text = lines.join("\n");

  return (
    <Sheet
      title={`Container Logs: ${container.name}`}
      onClose={onClose}
      actions={
        <>
          <AppButton
            icon={RefreshCw}
            onClick={() =>
              setLines((l) =>
                container.state === "running"
                  ? [...l, `[http] GET /health 200 ${2 + (l.length % 3)}ms`]
                  : l,
              )
            }
          >
            <span className="hidden sm:inline">Refresh</span>
          </AppButton>
          <AppButton
            icon={Copy}
            onClick={() =>
              navigator.clipboard?.writeText(text).then(
                () => setCopied(true),
                () => setCopied(false),
              )
            }
          >
            <span className="hidden sm:inline">
              {copied ? "Copied" : "Copy"}
            </span>
          </AppButton>
          <AppButton
            icon={Download}
            onClick={() => {
              const url = URL.createObjectURL(
                new Blob([text + "\n"], { type: "text/plain" }),
              );
              const a = Object.assign(document.createElement("a"), {
                href: url,
                download: `${container.name}.log`,
              });
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <span className="hidden sm:inline">Download</span>
          </AppButton>
        </>
      }
    >
      <pre className="m-0 px-4 py-3 font-mono text-[12px] leading-[1.75] whitespace-pre-wrap text-app-text/85">
        {text}
      </pre>
    </Sheet>
  );
}
