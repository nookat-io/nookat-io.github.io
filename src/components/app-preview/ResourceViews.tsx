import { useMemo, useState } from "react";
import { CloudDownload, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  type Action,
  type Container,
  HUB_RESULTS,
  type Image,
  type Network,
  type Volume,
  imageInUse,
  isDangling,
  volumeInUse,
} from "./model";
import {
  AppButton,
  Checkbox,
  Controls,
  EmptyRow,
  PageHeader,
  RowMenu,
  SearchField,
  Segmented,
  Sheet,
  Tag,
  mono,
  td,
  th,
} from "./parts";

const matches = (q: string, ...fields: string[]) => {
  const s = q.trim().toLowerCase();
  return !s || fields.some((f) => f.toLowerCase().includes(s));
};

function useSelection(validIds: string[]) {
  const [selected, setSelected] = useState<string[]>([]);
  const live = selected.filter((id) => validIds.includes(id));
  const toggle = (ids: string[], on: boolean) =>
    setSelected((s) =>
      on ? [...new Set([...s, ...ids])] : s.filter((id) => !ids.includes(id)),
    );
  return { live, toggle, clear: () => setSelected([]) };
}

function SelectAll({
  ids,
  live,
  toggle,
  label,
}: {
  ids: string[];
  live: string[];
  toggle: (ids: string[], on: boolean) => void;
  label: string;
}) {
  const all = ids.length > 0 && ids.every((id) => live.includes(id));
  return (
    <Checkbox
      checked={all}
      indeterminate={!all && ids.some((id) => live.includes(id))}
      onChange={(on) => toggle(ids, on)}
      label={label}
    />
  );
}

/* ------------------------------------------------------------------ Images */

export function ImagesView({
  images,
  containers,
  dispatch,
}: {
  images: Image[];
  containers: Container[];
  dispatch: (a: Action) => void;
}) {
  const [filter, setFilter] = useState<"all" | "used" | "dangling">("all");
  const [query, setQuery] = useState("");
  const [pulling, setPulling] = useState(false);
  const sel = useSelection(images.map((i) => i.id));

  const visible = useMemo(
    () =>
      images.filter((i) => {
        if (filter === "used" && !imageInUse(i, containers)) return false;
        if (filter === "dangling" && !isDangling(i)) return false;
        return matches(query, i.name, i.tag);
      }),
    [images, containers, filter, query],
  );
  const anyUnused = images.some((i) => !imageInUse(i, containers));

  return (
    <div>
      <PageHeader
        title="Images"
        subtitle={`Manage your images - ${images.length} images found`}
        actions={
          <>
            {sel.live.length > 0 ? (
              <AppButton
                variant="danger"
                icon={Trash2}
                onClick={() => {
                  dispatch({ type: "images/delete", ids: sel.live });
                  sel.clear();
                }}
              >
                Delete Selected ({sel.live.length})
              </AppButton>
            ) : (
              <AppButton
                icon={Trash2}
                disabled={!anyUnused}
                onClick={() => dispatch({ type: "images/prune" })}
              >
                Prune Unused
              </AppButton>
            )}
            <AppButton
              variant="primary"
              icon={CloudDownload}
              onClick={() => setPulling(true)}
            >
              Pull Image
            </AppButton>
          </>
        }
      />
      <Controls>
        <Segmented
          label="Filter images"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "used", label: "In Use" },
            { value: "dangling", label: "Dangling" },
          ]}
        />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search images..."
        />
      </Controls>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className={cn(th, "w-10")}>
              <SelectAll
                ids={visible.map((i) => i.id)}
                live={sel.live}
                toggle={sel.toggle}
                label="Select all images"
              />
            </th>
            <th className={th}>Name</th>
            <th className={cn(th, "w-[24%]")}>Tag</th>
            <th className={cn(th, "hidden w-[112px] lg:table-cell")}>
              Created
            </th>
            <th className={cn(th, "hidden w-[84px] sm:table-cell")}>Size</th>
            <th className={cn(th, "w-[92px]")}>Status</th>
            <th className={cn(th, "w-12")}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map((i) => {
            const used = imageInUse(i, containers);
            return (
              <tr
                key={i.id}
                className="border-t border-app-line/70 hover:bg-white/[0.025]"
              >
                <td className={td}>
                  <Checkbox
                    checked={sel.live.includes(i.id)}
                    onChange={(on) => sel.toggle([i.id], on)}
                    label={`Select ${i.name}:${i.tag}`}
                  />
                </td>
                <td
                  className={cn(
                    td,
                    "truncate font-medium",
                    isDangling(i) ? "text-app-muted" : "text-app-text",
                  )}
                >
                  {i.name}
                </td>
                <td className={cn(td, mono, "truncate")}>{i.tag}</td>
                <td
                  className={cn(td, "hidden whitespace-nowrap lg:table-cell")}
                >
                  {i.created}
                </td>
                <td className={cn(td, mono, "hidden sm:table-cell")}>
                  {i.size}
                </td>
                <td className={td}>
                  <Tag tone={used ? "live" : "muted"}>
                    {used ? "In Use" : "Unused"}
                  </Tag>
                </td>
                <td className={cn(td, "text-right")}>
                  <RowMenu
                    label={`Actions for ${i.name}:${i.tag}`}
                    items={[
                      {
                        label: "Delete",
                        icon: Trash2,
                        danger: true,
                        onSelect: () =>
                          dispatch({ type: "images/delete", ids: [i.id] }),
                      },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
          {visible.length === 0 && (
            <EmptyRow colSpan={7}>No images match this filter.</EmptyRow>
          )}
        </tbody>
      </table>
      {pulling && (
        <PullSheet
          onClose={() => setPulling(false)}
          onPull={(image) => {
            dispatch({ type: "images/pull", image });
            setPulling(false);
            setFilter("all");
          }}
        />
      )}
    </div>
  );
}

function PullSheet({
  onClose,
  onPull,
}: {
  onClose: () => void;
  onPull: (i: Image) => void;
}) {
  const [query, setQuery] = useState("");
  const results = HUB_RESULTS.filter((r) =>
    matches(query, r.name, r.description),
  );
  return (
    <Sheet title="Pull Image from Registry" onClose={onClose}>
      <div className="p-4">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search Docker Hub images..."
        />
        <ul className="mt-3 divide-y divide-app-line/70 rounded-lg border border-app-line">
          {results.map((r) => (
            <li key={r.name} className="flex items-center gap-3 px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium text-app-text">
                  {r.name}
                  <span className="ml-2 font-mono text-[11.5px] font-normal text-app-muted">
                    {r.tag}
                  </span>
                </p>
                <p className="truncate text-[12px] text-app-muted">
                  {r.description}
                </p>
              </div>
              <AppButton
                icon={CloudDownload}
                onClick={() =>
                  onPull({
                    id: `i-${r.name}`,
                    name: r.name,
                    tag: r.tag,
                    created: "Just now",
                    size: r.size,
                  })
                }
              >
                Pull
              </AppButton>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-[12.5px] text-app-muted">
              No results in this sample. The app searches all of Docker Hub.
            </li>
          )}
        </ul>
      </div>
    </Sheet>
  );
}

/* ----------------------------------------------------------------- Volumes */

export function VolumesView({
  volumes,
  containers,
  dispatch,
}: {
  volumes: Volume[];
  containers: Container[];
  dispatch: (a: Action) => void;
}) {
  const [filter, setFilter] = useState<"all" | "used" | "unused">("all");
  const [query, setQuery] = useState("");
  const sel = useSelection(volumes.map((v) => v.name));
  const visible = volumes.filter((v) => {
    const used = volumeInUse(v, containers);
    if (filter === "used" && !used) return false;
    if (filter === "unused" && used) return false;
    return matches(query, v.name);
  });
  const anyUnused = volumes.some((v) => !volumeInUse(v, containers));

  return (
    <div>
      <PageHeader
        title="Volumes"
        subtitle={`Manage your volumes - ${volumes.length} volumes found`}
        actions={
          sel.live.length > 0 ? (
            <AppButton
              variant="danger"
              icon={Trash2}
              onClick={() => {
                dispatch({ type: "volumes/delete", names: sel.live });
                sel.clear();
              }}
            >
              Delete
            </AppButton>
          ) : (
            <AppButton
              icon={Trash2}
              disabled={!anyUnused}
              onClick={() => dispatch({ type: "volumes/prune" })}
            >
              Prune Unused
            </AppButton>
          )
        }
      />
      <Controls>
        <Segmented
          label="Filter volumes"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "used", label: "In Use" },
            { value: "unused", label: "Unused" },
          ]}
        />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search volumes..."
        />
      </Controls>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className={cn(th, "w-10")}>
              <SelectAll
                ids={visible.map((v) => v.name)}
                live={sel.live}
                toggle={sel.toggle}
                label="Select all volumes"
              />
            </th>
            <th className={cn(th, "w-[38%] md:w-[30%]")}>Name</th>
            <th className={cn(th, "hidden w-[76px] sm:table-cell")}>Driver</th>
            <th className={cn(th, "hidden w-[76px] sm:table-cell")}>Scope</th>
            <th className={th}>Mount Point</th>
            <th className={cn(th, "w-12")}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map((v) => (
            <tr
              key={v.name}
              className="border-t border-app-line/70 hover:bg-white/[0.025]"
            >
              <td className={td}>
                <Checkbox
                  checked={sel.live.includes(v.name)}
                  onChange={(on) => sel.toggle([v.name], on)}
                  label={`Select ${v.name}`}
                />
              </td>
              <td className={cn(td, "truncate font-medium text-app-text")}>
                {v.name}
                {!volumeInUse(v, containers) && (
                  <span className="ml-2 align-middle">
                    <Tag tone="muted">Unused</Tag>
                  </span>
                )}
              </td>
              <td className={cn(td, mono, "hidden sm:table-cell")}>
                {v.driver}
              </td>
              <td className={cn(td, "hidden sm:table-cell")}>{v.scope}</td>
              <td className={cn(td, mono, "truncate")} title={v.mount}>
                {v.mount}
              </td>
              <td className={cn(td, "text-right")}>
                <RowMenu
                  label={`Actions for ${v.name}`}
                  items={[
                    {
                      label: "Delete",
                      icon: Trash2,
                      danger: true,
                      onSelect: () =>
                        dispatch({ type: "volumes/delete", names: [v.name] }),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <EmptyRow colSpan={6}>No volumes match this filter.</EmptyRow>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------------------------------------- Networks */

export function NetworksView({
  networks,
  dispatch,
}: {
  networks: Network[];
  dispatch: (a: Action) => void;
}) {
  const [filter, setFilter] = useState<"all" | "system" | "others">("all");
  const [query, setQuery] = useState("");
  const custom = networks.filter((n) => !n.system).map((n) => n.id);
  const sel = useSelection(custom);
  const visible = networks.filter((n) => {
    if (filter === "system" && !n.system) return false;
    if (filter === "others" && n.system) return false;
    return matches(query, n.name, n.driver);
  });

  return (
    <div>
      <PageHeader
        title="Networks"
        subtitle={`Manage your networks and container connectivity - ${networks.length} networks found`}
        actions={
          sel.live.length > 0 && (
            <AppButton
              variant="danger"
              icon={Trash2}
              onClick={() => {
                dispatch({ type: "networks/delete", ids: sel.live });
                sel.clear();
              }}
            >
              Delete Selected
            </AppButton>
          )
        }
      />
      <Controls>
        <Segmented
          label="Filter networks"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "system", label: "System" },
            { value: "others", label: "Others" },
          ]}
        />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search networks..."
        />
      </Controls>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className={cn(th, "w-10")}>
              <SelectAll
                ids={visible.filter((n) => !n.system).map((n) => n.id)}
                live={sel.live}
                toggle={sel.toggle}
                label="Select all custom networks"
              />
            </th>
            <th className={th}>Name</th>
            <th className={cn(th, "hidden w-[76px] sm:table-cell")}>Driver</th>
            <th className={cn(th, "hidden w-[112px] xl:table-cell")}>
              Created
            </th>
            <th className={cn(th, "hidden w-[124px] md:table-cell")}>Subnet</th>
            <th className={cn(th, "hidden w-[104px] lg:table-cell")}>
              Gateway
            </th>
            <th className={cn(th, "w-[84px]")}>Type</th>
            <th className={cn(th, "w-12")}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map((n) => (
            <tr
              key={n.id}
              className="border-t border-app-line/70 hover:bg-white/[0.025]"
            >
              <td className={td}>
                {!n.system && (
                  <Checkbox
                    checked={sel.live.includes(n.id)}
                    onChange={(on) => sel.toggle([n.id], on)}
                    label={`Select ${n.name}`}
                  />
                )}
              </td>
              <td className={cn(td, "truncate font-medium text-app-text")}>
                {n.name}
              </td>
              <td className={cn(td, mono, "hidden sm:table-cell")}>
                {n.driver}
              </td>
              <td className={cn(td, "hidden whitespace-nowrap xl:table-cell")}>
                {n.created}
              </td>
              <td className={cn(td, mono, "hidden md:table-cell")}>
                {n.subnet}
              </td>
              <td className={cn(td, mono, "hidden lg:table-cell")}>
                {n.gateway}
              </td>
              <td className={td}>
                <Tag tone={n.system ? "muted" : "neutral"}>
                  {n.system ? "System" : "Custom"}
                </Tag>
              </td>
              <td className={cn(td, "text-right")}>
                {!n.system && (
                  <RowMenu
                    label={`Actions for ${n.name}`}
                    items={[
                      {
                        label: "Delete",
                        icon: Trash2,
                        danger: true,
                        onSelect: () =>
                          dispatch({ type: "networks/delete", ids: [n.id] }),
                      },
                    ]}
                  />
                )}
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <EmptyRow colSpan={8}>No networks match this filter.</EmptyRow>
          )}
        </tbody>
      </table>
    </div>
  );
}
