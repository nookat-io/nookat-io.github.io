import { useState, useEffect, useCallback } from "react";

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

export interface GitHubContributor {
  login: string;
  id: number;
  contributions: number;
}

export interface GitHubRelease {
  id: number;
  name: string;
  assets: Array<{
    name: string;
    download_count: number;
  }>;
}

export interface GitHubMetrics {
  stars: number;
  contributors: number;
  latestTag: string | null;
  downloads: number;
}

export interface GitHubMetricsState {
  metrics: GitHubMetrics;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let metricsCache: GitHubMetrics | null = null;
let cacheTimestamp: number | null = null;

// Base GitHub API configuration
const GITHUB_CONFIG = {
  owner: "nookat-io",
  repo: "nookat",
  baseUrl: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
};

// Generic GitHub API request function
async function makeGitHubRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${GITHUB_CONFIG.baseUrl}${endpoint}`, {
    headers: GITHUB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getGitHubRepo(
  owner: string = GITHUB_CONFIG.owner,
  repo: string = GITHUB_CONFIG.repo,
): Promise<GitHubRepo> {
  return makeGitHubRequest<GitHubRepo>(`/repos/${owner}/${repo}`);
}

export async function getRepoStars(
  owner: string = GITHUB_CONFIG.owner,
  repo: string = GITHUB_CONFIG.repo,
): Promise<number> {
  const repoData = await getGitHubRepo(owner, repo);
  return repoData.stargazers_count;
}

export async function getContributorsCount(
  owner: string = GITHUB_CONFIG.owner,
  repo: string = GITHUB_CONFIG.repo,
): Promise<number> {
  const response = await fetch(
    `${GITHUB_CONFIG.baseUrl}/repos/${owner}/${repo}/contributors`,
    {
      headers: GITHUB_CONFIG.headers,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.statusText}`);
  }

  const contributors = await response.json();
  return contributors.length;
}

export async function getDownloadsCount(
  owner: string = GITHUB_CONFIG.owner,
  repo: string = GITHUB_CONFIG.repo,
): Promise<number> {
  const releases = await makeGitHubRequest<GitHubRelease[]>(
    `/repos/${owner}/${repo}/releases`,
  );

  console.log(releases);
  // Sum up all download counts from all assets in all releases
  let totalDownloads = 0;
  releases.forEach((release) => {
    release.assets.forEach((asset) => {
      totalDownloads += asset.download_count;
    });
  });

  return totalDownloads;
}

export async function getLatestTag(
  _owner: string = GITHUB_CONFIG.owner,
  _repo: string = GITHUB_CONFIG.repo,
): Promise<string> {
  return "0.1.3";
}

// Centralized function to fetch all metrics at once
export async function getAllGitHubMetrics(
  owner: string = GITHUB_CONFIG.owner,
  repo: string = GITHUB_CONFIG.repo,
): Promise<GitHubMetrics> {
  // Check cache first
  if (
    metricsCache &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  ) {
    return metricsCache;
  }

  try {
    // Fetch all metrics in parallel for better performance
    const [stars, contributors, downloads, latestTag] = await Promise.all([
      getRepoStars(owner, repo),
      getContributorsCount(owner, repo),
      getDownloadsCount(owner, repo),
      getLatestTag(owner, repo),
    ]);

    const metrics: GitHubMetrics = {
      stars,
      contributors,
      downloads,
      latestTag,
    };

    // Update cache
    metricsCache = metrics;
    cacheTimestamp = Date.now();

    return metrics;
  } catch (error) {
    console.error("Failed to fetch GitHub metrics:", error);

    // Return cached data if available, even if expired
    if (metricsCache) {
      console.warn("Using cached GitHub metrics due to API error");
      return metricsCache;
    }

    throw error;
  }
}

// Function to clear cache (useful for testing or manual refresh)
export function clearGitHubMetricsCache(): void {
  metricsCache = null;
  cacheTimestamp = null;
}

// Function to get cache status
export function getGitHubMetricsCacheStatus(): {
  hasCache: boolean;
  isExpired: boolean;
  age: number | null;
} {
  if (!metricsCache || !cacheTimestamp) {
    return { hasCache: false, isExpired: true, age: null };
  }

  const age = Date.now() - cacheTimestamp;
  const isExpired = age >= CACHE_DURATION;

  return {
    hasCache: true,
    isExpired,
    age,
  };
}

// Helper function to format star count
export function formatStarCount(count: number): string {
  if (count < 0) return "N/A";
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`;
  }
  return count.toString();
}

// Helper function to format any count
export function formatCount(count: number): string {
  if (count < 0) return "N/A";
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`;
  }
  return count.toString();
}

// React hook for managing GitHub metrics state
export function useGitHubMetrics(
  owner: string = GITHUB_CONFIG.owner,
  repo: string = GITHUB_CONFIG.repo,
  autoFetch: boolean = true,
) {
  const [state, setState] = useState<GitHubMetricsState>({
    metrics: { stars: 0, contributors: 0, downloads: 0, latestTag: null },
    isLoading: false,
    error: null,
    lastUpdated: null,
  });

  const fetchMetrics = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const metrics = await getAllGitHubMetrics(owner, repo);
      setState({
        metrics,
        isLoading: false,
        error: null,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch metrics",
      }));
    }
  }, [owner, repo]);

  const refreshMetrics = useCallback(() => {
    clearGitHubMetricsCache();
    fetchMetrics();
  }, [fetchMetrics]);

  useEffect(() => {
    if (autoFetch) {
      fetchMetrics();
    }
  }, [fetchMetrics, autoFetch]);

  return {
    ...state,
    fetchMetrics,
    refreshMetrics,
  };
}
