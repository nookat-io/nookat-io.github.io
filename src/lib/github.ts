import { useSyncExternalStore } from "react";

/**
 * Live data about the app repository, read from the public GitHub REST API.
 *
 * Unauthenticated requests are limited to 60 per hour per visitor IP, so the
 * whole page shares one in-flight load (three requests) and caches the result
 * in sessionStorage. Every consumer must render something sensible while the
 * data is loading or when it failed.
 */

export const OWNER = "nookat-io";
export const REPO = "nookat";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const LATEST_RELEASE_URL = `${REPO_URL}/releases/latest`;
export const ISSUES_URL = `${REPO_URL}/issues`;

const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const CACHE_KEY = "nookat:github:v1";
const CACHE_TTL_MS = 15 * 60 * 1000;

export type ReleaseAsset = {
  name: string;
  size: number;
  url: string;
};

export type Release = {
  tag: string;
  version: string;
  url: string;
  publishedAt: string;
  assets: ReleaseAsset[];
};

export type RepoStats = {
  stars: number;
  forks: number;
  contributors: number | null;
  installerDownloads: number | null;
};

export type GitHubData = {
  release: Release | null;
  stats: RepoStats | null;
};

export type GitHubState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: GitHubData }
  | { status: "error"; data: null };

type ApiAsset = {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
};

type ApiRelease = {
  tag_name: string;
  html_url: string;
  published_at: string;
  draft: boolean;
  prerelease: boolean;
  assets: ApiAsset[];
};

type ApiRepo = {
  stargazers_count: number;
  forks_count: number;
};

/** Files a person downloads to install Nookat; excludes updater manifests and signatures. */
export const INSTALLER_PATTERN = /\.(dmg|exe|msi|AppImage|deb|rpm)$/i;

async function getJson<T>(url: string): Promise<{ body: T; res: Response }> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  return { body: (await res.json()) as T, res };
}

/** Counts contributors with one request by reading the last page number from the Link header. */
async function getContributorCount(): Promise<number> {
  const { body, res } = await getJson<unknown[]>(
    `${API}/contributors?per_page=1&anon=0`,
  );
  const last = res.headers.get("link")?.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return last ? Number(last[1]) : body.length;
}

function toRelease(r: ApiRelease): Release {
  return {
    tag: r.tag_name,
    version: r.tag_name.replace(/^v/, ""),
    url: r.html_url,
    publishedAt: r.published_at,
    assets: r.assets.map((a) => ({
      name: a.name,
      size: a.size,
      url: a.browser_download_url,
    })),
  };
}

async function load(): Promise<GitHubData> {
  const [repo, contributors, releases] = await Promise.allSettled([
    getJson<ApiRepo>(API),
    getContributorCount(),
    getJson<ApiRelease[]>(`${API}/releases?per_page=100`),
  ]);

  let release: Release | null = null;
  let installerDownloads: number | null = null;
  if (releases.status === "fulfilled") {
    const published = releases.value.body.filter(
      (r) => !r.draft && !r.prerelease,
    );
    if (published[0]) release = toRelease(published[0]);
    installerDownloads = published
      .flatMap((r) => r.assets)
      .filter((a) => INSTALLER_PATTERN.test(a.name))
      .reduce((sum, a) => sum + a.download_count, 0);
  }

  const stats: RepoStats | null =
    repo.status === "fulfilled"
      ? {
          stars: repo.value.body.stargazers_count,
          forks: repo.value.body.forks_count,
          contributors:
            contributors.status === "fulfilled" ? contributors.value : null,
          installerDownloads,
        }
      : null;

  if (!release && !stats) throw new Error("GitHub data unavailable");
  return { release, stats };
}

function readCache(): GitHubData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: GitHubData };
    return Date.now() - at < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubData) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the page works without it.
  }
}

let state: GitHubState = { status: "loading", data: null };
let started = false;
const listeners = new Set<() => void>();

function setState(next: GitHubState) {
  state = next;
  listeners.forEach((notify) => notify());
}

function start() {
  if (started) return;
  started = true;
  const cached = readCache();
  if (cached) {
    setState({ status: "ready", data: cached });
    return;
  }
  load()
    .then((data) => {
      writeCache(data);
      setState({ status: "ready", data });
    })
    .catch(() => setState({ status: "error", data: null }));
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  start();
  return () => {
    listeners.delete(notify);
  };
}

const getSnapshot = () => state;

/** Shared GitHub data for the whole page. Fetches once, on first use. */
export function useGitHub(): GitHubState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n);
}

const dateFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}
