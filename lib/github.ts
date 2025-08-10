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

export async function getGitHubRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Add your GitHub token here if you need higher rate limits
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repo: ${response.statusText}`);
  }

  return response.json();
}

export async function getRepoStars(
  owner: string,
  repo: string,
): Promise<number> {
  const repoData = await getGitHubRepo(owner, repo);
  console.log(repoData);
  return repoData.stargazers_count;
}

export async function getContributorsCount(
  owner: string,
  repo: string,
): Promise<number> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=1`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.statusText}`);
  }

  // Get the total count from the Link header
  const linkHeader = response.headers.get("link");
  if (linkHeader) {
    const lastLink = linkHeader
      .split(",")
      .find((link) => link.includes('rel="last"'));
    if (lastLink) {
      const pageMatch = lastLink.match(/page=(\d+)/);
      if (pageMatch) {
        return parseInt(pageMatch[1]) * 30; // GitHub shows 30 contributors per page
      }
    }
  }

  // Fallback: count the contributors we can get
  const contributors = await response.json();
  return contributors.length;
}

export async function getDownloadsCount(
  owner: string,
  repo: string,
): Promise<number> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch releases: ${response.statusText}`);
  }

  const releases: GitHubRelease[] = await response.json();

  // Sum up all download counts from all assets in all releases
  let totalDownloads = 0;
  releases.forEach((release) => {
    release.assets.forEach((asset) => {
      totalDownloads += asset.download_count;
    });
  });

  return totalDownloads;
}

// Helper function to format star count
export function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`;
  }
  return count.toString();
}

// Helper function to format any count
export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`;
  }
  return count.toString();
}
