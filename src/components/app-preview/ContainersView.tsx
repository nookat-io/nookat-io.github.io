import { Fragment, useMemo, useState } from "react";
import {
  ChevronRight,
  FileText,
  Pause,
  Play,
  RotateCw,
  Square,
  SquareTerminal,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Action, Container, ContainerState } from "./model";
import {
  AppButton,
  Checkbox,
  Controls,
  EmptyRow,
  type MenuItem,
  PageHeader,
  RowMenu,
  SearchField,
  Segmented,
  StateBadge,
  Tag,
  mono,
  td,
  th,
} from "./parts";

type Filter = "all" | "running" | "stopped";

const isLive = (s: ContainerState) => s === "running" || s === "restarting";

export function ContainersView({
  containers,
  dispatch,
  onRestart,
  onLogs,
  onTerminal,
}: {
  containers: Container[];
  dispatch: (a: Action) => void;
  onRestart: (ids: string[]) => void;
  onLogs: (c: Container) => void;
  onTerminal: (c: Container) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const visible = useMemo(
    () =>
      containers.filter((c) => {
        if (filter === "running" && !isLive(c.state) && c.state !== "paused")
          return false;
        if (filter === "stopped" && c.state !== "exited") return false;
        const q = query.trim().toLowerCase();
        return !q || c.name.includes(q) || c.image.includes(q);
      }),
    [containers, filter, query],
  );

  const groups = useMemo(() => {
    const byProject = new Map<string, Container[]>();
    const standalone: Container[] = [];
    for (const c of visible) {
      if (c.project)
        byProject.set(c.project, [...(byProject.get(c.project) ?? []), c]);
      else standalone.push(c);
    }
    return { projects: [...byProject.entries()], standalone };
  }, [visible]);

  const live = selected.filter((id) => containers.some((c) => c.id === id));
  const selectedRows = containers.filter((c) => live.includes(c.id));
  const toggle = (ids: string[], on: boolean) =>
    setSelected((s) =>
      on ? [...new Set([...s, ...ids])] : s.filter((id) => !ids.includes(id)),
    );
  const set = (ids: string[], state: ContainerState) =>
    dispatch({ type: "containers/set", ids, state });
  const remove = (ids: string[]) => {
    dispatch({ type: "containers/delete", ids });
    setSelected((s) => s.filter((id) => !ids.includes(id)));
  };

  const menuFor = (c: Container): MenuItem[] => {
    const items: MenuItem[] = [];
    if (c.state === "exited")
      items.push({
        label: "Start",
        icon: Play,
        onSelect: () => set([c.id], "running"),
      });
    if (isLive(c.state))
      items.push({
        label: "Stop",
        icon: Square,
        onSelect: () => set([c.id], "exited"),
      });
    if (c.state === "running")
      items.push({
        label: "Pause",
        icon: Pause,
        onSelect: () => set([c.id], "paused"),
      });
    if (c.state === "paused")
      items.push({
        label: "Resume",
        icon: Play,
        onSelect: () => set([c.id], "running"),
      });
    if (c.state !== "exited")
      items.push({
        label: "Restart",
        icon: RotateCw,
        onSelect: () => onRestart([c.id]),
      });
    if (c.state === "running")
      items.push({
        label: "Terminal",
        icon: SquareTerminal,
        onSelect: () => onTerminal(c),
      });
    items.push({ label: "Logs", icon: FileText, onSelect: () => onLogs(c) });
    items.push({
      label: c.state === "exited" ? "Delete" : "Force Delete",
      icon: Trash2,
      danger: true,
      onSelect: () => remove([c.id]),
    });
    return items;
  };

  const anyStopped = containers.some((c) => c.state === "exited");
  const bulk = selectedRows.length > 0 && (
    <>
      {selectedRows.some((c) => c.state === "exited") && (
        <AppButton icon={Play} onClick={() => set(live, "running")}>
          Start
        </AppButton>
      )}
      {selectedRows.some((c) => isLive(c.state)) && (
        <AppButton icon={Square} onClick={() => set(live, "exited")}>
          Stop
        </AppButton>
      )}
      {selectedRows.some((c) => c.state === "running") && (
        <AppButton
          icon={Pause}
          onClick={() =>
            set(
              live.filter(
                (id) =>
                  selectedRows.find((c) => c.id === id)?.state === "running",
              ),
              "paused",
            )
          }
        >
          Pause
        </AppButton>
      )}
      {selectedRows.some((c) => c.state !== "exited") && (
        <AppButton icon={RotateCw} onClick={() => onRestart(live)}>
          Restart
        </AppButton>
      )}
      <AppButton variant="danger" icon={Trash2} onClick={() => remove(live)}>
        Delete
      </AppButton>
    </>
  );

  const allIds = visible.map((c) => c.id);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => live.includes(id));

  const row = (c: Container, nested: boolean) => (
    <tr
      key={c.id}
      className="border-t border-app-line/70 transition-colors hover:bg-white/[0.025]"
    >
      <td className={cn(td, "w-10")}>
        <Checkbox
          checked={live.includes(c.id)}
          onChange={(on) => toggle([c.id], on)}
          label={`Select ${c.name}`}
        />
      </td>
      <td className={td}>
        <span
          className={cn(
            "block truncate font-medium text-app-text",
            nested && "pl-5",
          )}
        >
          {c.name}
        </span>
      </td>
      <td className={cn(td, mono, "hidden sm:table-cell")}>{c.image}</td>
      <td className={td}>
        <StateBadge state={c.state} />
      </td>
      <td className={cn(td, "hidden whitespace-nowrap lg:table-cell")}>
        {c.created}
      </td>
      <td className={cn(td, mono, "hidden md:table-cell")}>
        {c.ports.length ? (
          <span className="text-blue underline decoration-blue/35 underline-offset-2">
            {c.ports.join(", ")}
          </span>
        ) : (
          "-"
        )}
      </td>
      <td className={cn(td, "w-12 text-right")}>
        <RowMenu items={menuFor(c)} label={`Actions for ${c.name}`} />
      </td>
    </tr>
  );

  return (
    <div>
      <PageHeader
        title="Containers"
        subtitle={`Manage your containers - ${containers.length} containers found`}
        actions={
          bulk || (
            <AppButton
              icon={Trash2}
              disabled={!anyStopped}
              onClick={() => dispatch({ type: "containers/prune" })}
            >
              Prune Stopped
            </AppButton>
          )
        }
      />
      <Controls>
        <Segmented
          label="Filter containers"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "running", label: "Running" },
            { value: "stopped", label: "Stopped" },
          ]}
        />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search containers..."
        />
      </Controls>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className={cn(th, "w-10")}>
              <Checkbox
                checked={allSelected}
                indeterminate={
                  !allSelected && allIds.some((id) => live.includes(id))
                }
                onChange={(on) => toggle(allIds, on)}
                label="Select all containers"
              />
            </th>
            <th className={th}>Name</th>
            <th className={cn(th, "hidden w-[30%] sm:table-cell")}>Image</th>
            <th className={cn(th, "w-[108px]")}>Status</th>
            <th className={cn(th, "hidden w-[112px] lg:table-cell")}>
              Created
            </th>
            <th className={cn(th, "hidden w-[108px] md:table-cell")}>Ports</th>
            <th className={cn(th, "w-12")}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.projects.map(([project, members]) => {
            const open = !collapsed.includes(project);
            const anyRunning = members.some((m) => isLive(m.state));
            const ids = members.map((m) => m.id);
            return (
              <Fragment key={project}>
                <tr className="border-t border-app-line/70 bg-white/[0.015]">
                  <td className={cn(td, "w-10")}>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${open ? "Collapse" : "Expand"} ${project}`}
                      onClick={() =>
                        setCollapsed((s) =>
                          open
                            ? [...s, project]
                            : s.filter((p) => p !== project),
                        )
                      }
                      className="-ml-1 grid size-6 place-items-center rounded text-app-muted hover:bg-white/[0.07] hover:text-app-text"
                    >
                      <ChevronRight
                        className={cn(
                          "size-4 transition-transform duration-200",
                          open && "rotate-90",
                        )}
                        strokeWidth={2}
                      />
                    </button>
                  </td>
                  <td className={cn(td, "font-semibold text-app-text")}>
                    {project}
                  </td>
                  <td className={cn(td, "hidden sm:table-cell")}>
                    <Tag>{members.length} containers</Tag>
                  </td>
                  <td className={td}>
                    <StateBadge state={anyRunning ? "running" : "exited"} />
                  </td>
                  <td className={cn(td, "hidden lg:table-cell")}>-</td>
                  <td className={cn(td, "hidden md:table-cell")}>-</td>
                  <td className={cn(td, "w-12 text-right")}>
                    <RowMenu
                      label={`Actions for ${project}`}
                      items={[
                        {
                          label: "Start",
                          icon: Play,
                          onSelect: () => set(ids, "running"),
                        },
                        {
                          label: "Stop",
                          icon: Square,
                          onSelect: () => set(ids, "exited"),
                        },
                        {
                          label: anyRunning ? "Force Delete" : "Delete",
                          icon: Trash2,
                          danger: true,
                          onSelect: () => remove(ids),
                        },
                      ]}
                    />
                  </td>
                </tr>
                {open && members.map((m) => row(m, true))}
              </Fragment>
            );
          })}
          {groups.standalone.map((c) => row(c, false))}
          {visible.length === 0 && (
            <EmptyRow colSpan={7}>
              {containers.length === 0
                ? "No containers. Start something from your terminal and it appears here."
                : "No containers match this filter."}
            </EmptyRow>
          )}
        </tbody>
      </table>
    </div>
  );
}
