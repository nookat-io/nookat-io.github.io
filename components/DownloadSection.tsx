"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGitHubMetrics } from "@/lib/github";
import { getLatestReleaseAssets } from "@/lib/github";

type SupportedOS = "macOS" | "Windows" | "Linux";

type DownloadOption = {
  label: string;
  url: string;
  os: SupportedOS;
  format: string;
  channel: "Stable" | "Debug";
};

export function DownloadSection() {
  const [userOS, setUserOS] = useState<string>("");
  const [otherOS, setOtherOS] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [assets, setAssets] = useState<
    Array<{
      name: string;
      browser_download_url: string;
      download_count: number;
    }>
  >([]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Use the centralized GitHub metrics hook
  const { metrics } = useGitHubMetrics();

  const latestTag = metrics?.latestTag;

  useEffect(() => {
    setMounted(true);
    // Detect user's operating system
    const detectOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes("mac")) {
        setUserOS("macOS");
        setOtherOS("Other Systems or Versions");
      } else if (userAgent.includes("win")) {
        setUserOS("Windows");
        setOtherOS("Other Systems or Versions");
      } else if (userAgent.includes("linux")) {
        setUserOS("Linux");
        setOtherOS("Other Systems or Versions");
      } else {
        // Default fallback
        setUserOS("Other Systems and version");
        setOtherOS("macOS");
      }
    };

    detectOS();

    getLatestReleaseAssets()
      .then(({ assets }) => {
        setAssets(
          (assets || []).map((a) => ({
            name: a.name,
            browser_download_url: a.browser_download_url,
            download_count: a.download_count,
          })),
        );
      })
      .catch(() => {
        // Ignore; fallback URLs will still work
      });
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const getDownloadUrl = (os: string) => {
    switch (os.toLowerCase()) {
      case "macos":
        return `https://github.com/nookat-io/nookat/releases/download/v${latestTag}/Nookat_${latestTag}_universal.dmg`;
      case "windows":
        return `https://github.com/nookat-io/nookat/releases/download/v${latestTag}/Nookat_${latestTag}_x64-setup.exe`;
      case "linux":
        return `https://github.com/nookat-io/nookat/releases/download/v${latestTag}/Nookat_${latestTag}_amd64.AppImage`;
      default:
        return "https://github.com/nookat-io/nookat/releases/";
    }
  };

  const handleDownload = (os: string) => {
    if (!mounted) return;
    const url = getDownloadUrl(os);
    window.open(url, "_blank");
  };

  const handleOtherDownload = () => {
    if (!mounted) return;
    // Open GitHub releases page for all other options
    window.open("https://github.com/nookat-io/nookat/releases/", "_blank");
  };

  const handleGitHubClick = () => {
    if (!mounted) return;
    window.open("https://github.com/nookat-io/nookat", "_blank");
  };

  const inferOSFromName = (name: string): SupportedOS | null => {
    const lower = name.toLowerCase();
    if (
      lower.endsWith(".dmg") ||
      lower.includes("mac") ||
      lower.includes("darwin")
    )
      return "macOS";
    if (
      lower.endsWith(".exe") ||
      lower.endsWith(".msi") ||
      lower.includes("win")
    )
      return "Windows";
    if (
      lower.endsWith(".appimage") ||
      lower.endsWith(".deb") ||
      lower.endsWith(".rpm") ||
      lower.includes("linux")
    )
      return "Linux";
    return null;
  };

  const inferFormatFromName = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.endsWith(".dmg")) return "dmg";
    if (lower.endsWith(".exe")) return "exe";
    if (lower.endsWith(".msi")) return "msi";
    if (lower.endsWith(".appimage")) return "appimage";
    if (lower.endsWith(".deb")) return "deb";
    if (lower.endsWith(".rpm")) return "rpm";
    if (lower.endsWith(".zip")) return "zip";
    return "file";
  };

  const inferChannelFromName = (name: string): "Stable" | "Debug" => {
    return name.toLowerCase().includes("debug") ? "Debug" : "Stable";
  };

  const allOptions: DownloadOption[] = useMemo(() => {
    return assets
      .map((a) => {
        const os = inferOSFromName(a.name);
        if (!os) return null;
        return {
          label: `${inferChannelFromName(a.name)} ${inferFormatFromName(a.name).toUpperCase()}`,
          url: a.browser_download_url,
          os,
          format: inferFormatFromName(a.name),
          channel: inferChannelFromName(a.name),
        } as DownloadOption;
      })
      .filter(Boolean) as DownloadOption[];
  }, [assets]);

  const sortOptions = (opts: DownloadOption[]): DownloadOption[] => {
    const formatOrder: Record<SupportedOS, string[]> = {
      macOS: ["dmg", "zip"],
      Windows: ["exe", "msi"],
      Linux: ["appimage", "deb", "rpm", "zip"],
    };
    return [...opts].sort((a, b) => {
      if (a.channel !== b.channel) return a.channel === "Stable" ? -1 : 1;
      const order = formatOrder[a.os] || [];
      const aIndex = order.indexOf(a.format);
      const bIndex = order.indexOf(b.format);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
  };

  const optionsForUserOS = useMemo(() => {
    if (userOS !== "macOS" && userOS !== "Windows" && userOS !== "Linux")
      return [] as DownloadOption[];
    const filtered = allOptions.filter((o) => o.os === userOS);
    return sortOptions(filtered);
  }, [allOptions, userOS]);

  return (
    <>
      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <div className="relative w-full sm:w-auto" ref={menuRef}>
          <Button
            className="btn-primary text-lg px-8 py-4 h-14 text-white pr-6 w-full sm:w-auto"
            onClick={() => {
              if (optionsForUserOS.length === 0) {
                handleDownload(userOS);
                return;
              }
              setMenuOpen((v) => !v);
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download for {userOS}
            {optionsForUserOS.length > 0 && (
              <ChevronDown className="w-4 h-4 ml-2 opacity-80" />
            )}
          </Button>

          {menuOpen && optionsForUserOS.length > 0 && (
            <div
              className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 z-50"
              role="menu"
            >
              <div className="py-2">
                {optionsForUserOS.map((opt, idx) => (
                  <button
                    key={`${opt.label}-${idx}`}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                    onClick={() => {
                      window.open(opt.url, "_blank");
                      setMenuOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700" />
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 inline-flex items-center gap-2"
                onClick={() => {
                  window.open(
                    "https://github.com/nookat-io/nookat/releases/",
                    "_blank",
                  );
                  setMenuOpen(false);
                }}
              >
                <ExternalLink className="w-4 h-4" /> View all releases
              </button>
            </div>
          )}
        </div>
        <Button
          className="btn-secondary text-lg px-8 py-4 h-14 w-full sm:w-auto"
          onClick={handleGitHubClick}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          View on GitHub
        </Button>
      </div>

      {/* Secondary Download Option */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={handleOtherDownload}
        >
          <Download className="w-4 h-4 mr-2" />
          Download for {otherOS}
        </Button>
      </div>
    </>
  );
}
