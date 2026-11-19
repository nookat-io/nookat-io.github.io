import { useEffect, useMemo, useState } from "react";
import { type Release, type ReleaseAsset, useGitHub } from "./github";

export type OS = "macos" | "windows" | "linux";
export type Arch = "universal" | "x64" | "arm64";
export type Format = "dmg" | "exe" | "msi" | "AppImage" | "deb" | "rpm";

export type Installer = {
  os: OS;
  arch: Arch;
  format: Format;
  name: string;
  url: string;
  size: number;
};

export const PLATFORMS: {
  id: OS;
  label: string;
  requirement: string;
}[] = [
  {
    id: "macos",
    label: "macOS",
    requirement: "macOS 11 Big Sur or later, Apple silicon and Intel",
  },
  { id: "windows", label: "Windows", requirement: "Windows 10 or later, x64" },
  {
    id: "linux",
    label: "Linux",
    requirement: "x86_64 and ARM64, AppImage, .deb or .rpm",
  },
];

export const osLabel = (os: OS) =>
  PLATFORMS.find((p) => p.id === os)?.label ?? os;

const FORMAT_ORDER: Record<OS, Format[]> = {
  macos: ["dmg"],
  windows: ["exe", "msi"],
  linux: ["AppImage", "deb", "rpm"],
};

export function formatLabel(i: Installer): string {
  switch (i.format) {
    case "dmg":
      return i.arch === "universal"
        ? "Universal .dmg"
        : `.dmg, ${archLabel(i.arch)}`;
    case "exe":
      return "Setup .exe";
    case "msi":
      return "Windows Installer .msi";
    case "AppImage":
      return `AppImage, ${archLabel(i.arch)}`;
    case "deb":
      return `.deb, ${archLabel(i.arch)}`;
    case "rpm":
      return `.rpm, ${archLabel(i.arch)}`;
  }
}

export function formatHint(i: Installer): string | null {
  switch (i.format) {
    case "deb":
      return "Debian, Ubuntu";
    case "rpm":
      return "Fedora, openSUSE";
    case "AppImage":
      return "Any distribution";
    case "msi":
      return "For managed installs";
    default:
      return null;
  }
}

const archLabel = (a: Arch) =>
  a === "arm64" ? "ARM64" : a === "x64" ? "x86_64" : "Universal";

function archOf(name: string): Arch {
  if (/universal/i.test(name)) return "universal";
  if (/aarch64|arm64/i.test(name)) return "arm64";
  return "x64";
}

/** Maps a release asset to an installer, or null for signatures, updater bundles and debug builds. */
export function classify(asset: ReleaseAsset): Installer | null {
  const { name } = asset;
  if (/debug/i.test(name)) return null;
  const base = { name, url: asset.url, size: asset.size, arch: archOf(name) };
  if (/\.dmg$/i.test(name)) return { ...base, os: "macos", format: "dmg" };
  if (/\.exe$/i.test(name)) return { ...base, os: "windows", format: "exe" };
  if (/\.msi$/i.test(name)) return { ...base, os: "windows", format: "msi" };
  if (/\.AppImage$/i.test(name))
    return { ...base, os: "linux", format: "AppImage" };
  if (/\.deb$/i.test(name)) return { ...base, os: "linux", format: "deb" };
  if (/\.rpm$/i.test(name)) return { ...base, os: "linux", format: "rpm" };
  return null;
}

export function installersFor(release: Release | null, os: OS): Installer[] {
  if (!release) return [];
  const order = FORMAT_ORDER[os];
  const archRank: Record<Arch, number> = { universal: 0, x64: 1, arm64: 2 };
  return release.assets
    .map(classify)
    .filter((i): i is Installer => i !== null && i.os === os)
    .sort(
      (a, b) =>
        order.indexOf(a.format) - order.indexOf(b.format) ||
        archRank[a.arch] - archRank[b.arch],
    );
}

/** The single best installer for a platform: universal on macOS, the setup .exe on Windows, the AppImage matching the CPU on Linux. */
export function primaryInstaller(
  installers: Installer[],
  arch: Arch | null,
): Installer | undefined {
  const preferred = installers.filter(
    (i) => i.format === installers[0]?.format,
  );
  return (
    preferred.find((i) => i.arch === "universal") ??
    preferred.find((i) => i.arch === (arch ?? "x64")) ??
    preferred[0]
  );
}

/** Sizes as GitHub's release page shows them (binary megabytes, labelled MB). */
export function formatSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export type Visitor = {
  os: OS | null;
  arch: Arch | null;
  mobile: boolean;
};

type UAData = {
  platform?: string;
  mobile?: boolean;
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string }>;
};

function detect(): Visitor {
  if (typeof navigator === "undefined")
    return { os: null, arch: null, mobile: false };
  const ua = navigator.userAgent;
  const uaData = (navigator as Navigator & { userAgentData?: UAData })
    .userAgentData;
  const platform = (uaData?.platform || navigator.platform || "").toLowerCase();
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  const mobile =
    Boolean(uaData?.mobile) || iPadOS || /Android|iPhone|iPad|iPod/i.test(ua);
  if (mobile) return { os: null, arch: null, mobile: true };

  let os: OS | null = null;
  if (/mac/.test(platform) || /Mac OS X/.test(ua)) os = "macos";
  else if (/win/.test(platform) || /Windows/.test(ua)) os = "windows";
  else if (/linux|x11|cros/.test(platform) || /Linux|X11|CrOS/.test(ua))
    os = "linux";

  const arch: Arch | null = /aarch64|arm64|armv8/i.test(ua) ? "arm64" : null;
  return { os, arch, mobile: false };
}

/** Visitor OS and CPU, refined with client hints where the browser offers them. */
export function useVisitor(): Visitor {
  const [visitor, setVisitor] = useState<Visitor>(detect);
  useEffect(() => {
    if (visitor.os !== "linux" || visitor.arch) return;
    const uaData = (navigator as Navigator & { userAgentData?: UAData })
      .userAgentData;
    let cancelled = false;
    uaData
      ?.getHighEntropyValues?.(["architecture"])
      .then(({ architecture }) => {
        if (!cancelled && architecture === "arm") {
          setVisitor((v) => ({ ...v, arch: "arm64" }));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [visitor.os, visitor.arch]);
  return visitor;
}

export type Offer = {
  os: OS;
  installer: Installer | undefined;
  version: string | null;
  loading: boolean;
};

/** What the hero's one-click button should offer this visitor. */
export function useOffer(): Offer & { visitor: Visitor } {
  const visitor = useVisitor();
  const gh = useGitHub();
  const os = visitor.os ?? "macos";
  const release = gh.status === "ready" ? gh.data.release : null;
  const installer = useMemo(
    () => primaryInstaller(installersFor(release, os), visitor.arch),
    [release, os, visitor.arch],
  );
  return {
    os,
    installer,
    version: release?.version ?? null,
    loading: gh.status === "loading",
    visitor,
  };
}
