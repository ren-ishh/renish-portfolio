// src/lib/github.ts — fetches public repos from GitHub API with ISR (revalidates every hour)

import type { Project } from "@/types";

const GITHUB_USERNAME = "ren-ishh";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  archived: boolean;
  fork: boolean;
  visibility: string;
  updated_at: string;
}

export async function getGitHubProjects(): Promise<Project[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    const starred = repos
      .filter((r) => {
        if (r.fork) return false;
        if (r.archived) return false;
        if (r.visibility !== "public") return false;
        if (r.stargazers_count < 1) return false;
        return true;
      })
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count)
          return b.stargazers_count - a.stargazers_count;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    return starred.map((repo, index): Project => ({
      id: repo.id,
      title: formatRepoName(repo.name),
      description: repo.description ?? "No description provided.",
      longDescription: repo.description ?? "No description provided.",
      tech:
        repo.topics.length > 0
          ? repo.topics.map(capitalizeTag)
          : repo.language
            ? [repo.language]
            : ["Code"],
      github: repo.html_url,
      live: repo.homepage?.trim() || null,
      status: "Active",
      featured: index < 3,
    }));
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return [];
  }
}

function formatRepoName(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function capitalizeTag(tag: string): string {
  const known: Record<string, string> = {
    "next.js": "Next.js",
    nextjs: "Next.js",
    react: "React",
    typescript: "TypeScript",
    javascript: "JavaScript",
    python: "Python",
    html: "HTML",
    css: "CSS",
    nodejs: "Node.js",
    tailwindcss: "Tailwind CSS",
    tailwind: "Tailwind CSS",
    mongodb: "MongoDB",
    postgres: "PostgreSQL",
    sql: "SQL",
    docker: "Docker",
    linux: "Linux",
  };
  return known[tag.toLowerCase()] ?? tag.charAt(0).toUpperCase() + tag.slice(1);
}
