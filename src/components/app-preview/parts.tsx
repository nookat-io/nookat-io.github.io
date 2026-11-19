import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Ellipsis, Minus, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ContainerState } from "./model";

export const th =
  "h-9 px-3 text-left text-[11.5px] font-medium text-app-faint first:pl-4 last:pr-4 sm:first:pl-5 sm:last:pr-5";
export const td =
  "h-12 px-3 text-[12.5px] text-app-muted first:pl-4 last:pr-4 sm:first:pl-5 sm:last:pr-5";
export const mono = "font-mono text-[11.5px] tabular-nums";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-5 sm:px-5">
      <div className="min-w-0">
        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-app-text">
          {title}
        </h3>
        <p className="mt-0.5 text-[12.5px] text-app-muted">{subtitle}</p>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-1.5">{actions}</div>
      )}
    </div>
  );
}

export function AppButton({
  children,
  onClick,
  variant = "ghost",
  icon: Icon,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  icon?: typeof Search;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" &&
          "bg-blue-strong text-white hover:bg-blue-strong-hover",
        variant === "ghost" &&
          "border border-app-line text-app-text/85 hover:border-white/20 hover:bg-white/[0.05]",
        variant === "danger" &&
          "border border-[#5a2a24] text-[#f2a297] hover:bg-[#3a1c18]",
      )}
    >
      {Icon && <Icon className="size-3.5" strokeWidth={2} />}
      {children}
    </button>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-lg border border-app-line bg-app-side p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-7 rounded-md px-2.5 text-[12px] font-medium transition-colors",
            o.value === value
              ? "bg-app-raise text-app-text shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              : "text-app-muted hover:text-app-text",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="relative block w-full sm:w-56">
      <span className="sr-only">{placeholder}</span>
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-app-faint"
        strokeWidth={2}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.stopPropagation();
            onChange("");
          }
        }}
        placeholder={placeholder}
        className="h-8 w-full rounded-md border border-app-line bg-app-side pl-8 pr-7 text-[12.5px] text-app-text caret-blue outline-none transition-[border-color,box-shadow] placeholder:text-app-faint focus-visible:border-blue/70 focus-visible:shadow-[0_0_0_3px_rgba(20,148,242,0.18)] [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded text-app-faint hover:bg-white/[0.07] hover:text-app-text"
        >
          <X className="size-3.5" strokeWidth={2} />
        </button>
      )}
    </label>
  );
}

export function Controls({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 px-4 pb-3 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      {children}
    </div>
  );
}

export function Checkbox({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);
  return (
    <span className="relative inline-grid size-3.5 shrink-0 place-items-center align-middle">
      <input
        ref={ref}
        type="checkbox"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-[4px] border border-white/20 bg-app-raise transition-colors hover:border-white/35 checked:border-blue checked:bg-blue indeterminate:border-blue indeterminate:bg-blue"
      />
      <Check
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 size-2.5 text-white opacity-0 peer-checked:opacity-100"
        strokeWidth={3.5}
      />
      <Minus
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 size-2.5 text-white opacity-0 peer-indeterminate:opacity-100"
        strokeWidth={3.5}
      />
    </span>
  );
}

const STATE_STYLE: Record<ContainerState | "exited-group", string> = {
  running: "bg-green/12 text-green-light ring-green/25",
  restarting: "bg-amber/12 text-amber ring-amber/25",
  paused: "bg-amber/12 text-amber ring-amber/25",
  exited: "bg-white/[0.04] text-app-muted ring-white/10",
  "exited-group": "bg-white/[0.04] text-app-muted ring-white/10",
};

export function StateBadge({ state }: { state: ContainerState }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-medium ring-1 ring-inset",
        STATE_STYLE[state],
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full bg-current",
          state === "restarting" && "animate-pulse",
        )}
      />
      {state}
    </span>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "live" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11.5px] font-medium ring-1 ring-inset",
        tone === "live" && "bg-green/12 text-green-light ring-green/25",
        tone === "neutral" && "bg-white/[0.05] text-app-text/80 ring-white/12",
        tone === "muted" && "text-app-muted ring-white/10",
      )}
    >
      {children}
    </span>
  );
}

export type MenuItem = {
  label: string;
  onSelect: () => void;
  danger?: boolean;
  icon?: typeof Search;
};

/** Row "..." menu. Positioned fixed so table scrolling and the window's rounded clip never cut it off. */
export function RowMenu({
  items,
  label,
}: {
  items: MenuItem[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!open || !button.current) return;
    const r = button.current.getBoundingClientRect();
    const height = items.length * 34 + 10;
    // Keep the menu inside the preview window, like a native menu inside its app.
    const frame = button.current
      .closest("[data-app-window]")
      ?.getBoundingClientRect();
    const floor = Math.min(window.innerHeight, frame?.bottom ?? Infinity) - 8;
    const ceiling = Math.max(0, frame?.top ?? 0) + 8;
    const below =
      r.bottom + 6 + height <= floor || r.top - 6 - height < ceiling;
    setPos({
      top: below ? r.bottom + 6 : r.top - 6 - height,
      left: Math.max(8, r.right - 188),
    });
  }, [open, items.length]);

  useEffect(() => {
    if (open && pos)
      menu.current
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus({ preventScroll: true });
  }, [open, pos]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (
        !menu.current?.contains(e.target as Node) &&
        !button.current?.contains(e.target as Node)
      )
        close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        button.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const els = Array.from(menu.current?.querySelectorAll("button") ?? []);
        const i = els.indexOf(document.activeElement as HTMLButtonElement);
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        els[(next + els.length) % els.length]?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, { passive: true, capture: true });
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, { capture: true });
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "grid size-7 place-items-center rounded-md text-app-muted transition-colors hover:bg-white/[0.07] hover:text-app-text",
          open && "bg-white/[0.07] text-app-text",
        )}
      >
        <Ellipsis className="size-4" strokeWidth={2} />
      </button>
      {open && pos && (
        <div
          ref={menu}
          id={id}
          role="menu"
          aria-label={label}
          style={{ top: pos.top, left: pos.left }}
          className="fixed z-50 w-[188px] rounded-lg border border-app-line bg-[#141b15] p-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className={cn(
                  "flex h-8 w-full items-center gap-2.5 rounded-md px-2.5 text-left text-[12.5px] outline-none transition-colors focus-visible:bg-white/[0.08]",
                  item.danger
                    ? "text-[#f2a297] hover:bg-[#3a1c18] focus-visible:bg-[#3a1c18]"
                    : "text-app-text/90 hover:bg-white/[0.07]",
                )}
              >
                {Icon && (
                  <Icon className="size-3.5 opacity-80" strokeWidth={2} />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

/** An in-app dialog that covers the preview's content area, like the app's own modals. */
export function Sheet({
  title,
  onClose,
  actions,
  children,
}: {
  title: string;
  onClose: () => void;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("input, button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [onClose]);
  return (
    <div className="absolute inset-0 z-20 flex items-start justify-center bg-[#050806]/70 p-3 pt-6 backdrop-blur-[2px] sm:p-6 sm:pt-10">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-full w-full max-w-[640px] flex-col overflow-hidden rounded-xl border border-app-line bg-app shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-app-line px-4 py-3">
          <h4
            id={titleId}
            className="truncate text-[13.5px] font-semibold text-app-text"
          >
            {title}
          </h4>
          <div className="flex items-center gap-1.5">
            {actions}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="grid size-7 place-items-center rounded-md text-app-muted hover:bg-white/[0.07] hover:text-app-text"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="scroll-dark min-h-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export function EmptyRow({
  colSpan,
  children,
}: {
  colSpan: number;
  children: ReactNode;
}) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="h-28 px-5 text-center text-[12.5px] text-app-muted"
      >
        {children}
      </td>
    </tr>
  );
}
