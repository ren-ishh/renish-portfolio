// src/lib/github.ts
// Fetches public repos from GitHub API with ISR caching (revalidates every 24h)

import type { Project } from "@/types";

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
  updated_at: string;
  visibility: string;
}

const GITHUB_USERNAME = "ren-ishh";

// Repos to always hide (forks, boring boilerplates, etc.)
const EXCLUDED_REPOS = ["renish-portfolio", ".github"];

export async function getGitHubProjects(): Promise<Project[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Add token if available (removes 60/hr rate limit → 5000/hr)
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers,
        // Next.js ISR — revalidate once every 24 hours
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return getFallbackProjects();
    }

    const repos: GitHubRepo[] = await res.json();

    const filtered = repos
      .filter((r) => {
        // Remove forks, archived, private, and excluded repos
        if (r.fork) return false;
        if (r.archived) return false;
        if (r.visibility !== "public") return false;
        if (EXCLUDED_REPOS.includes(r.name)) return false;
        return true;
      })
      .sort((a, b) => {
        // Pinned-like: starred first, then by update date
        if (b.stargazers_count !== a.stargazers_count)
          return b.stargazers_count - a.stargazers_count;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    if (filtered.length === 0) return getFallbackProjects();

    return filtered.map((repo, index): Project => ({
      id: repo.id,
      title: formatRepoName(repo.name),
      description: repo.description ?? "No description provided.",
      longDescription: repo.description ?? "No description provided.",
      // topics as tech stack; fallback to primary language
      tech: repo.topics.length > 0
        ? repo.topics.map(capitalizeTag)
        : repo.language
        ? [repo.language]
        : ["Code"],
      github: repo.html_url,
      live: repo.homepage && repo.homepage.trim() !== "" ? repo.homepage : null,
      status: "Active",
      // First 3 are featured
      featured: index < 3,
    }));
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return getFallbackProjects();
  }
}

// Converts "my-repo-name" → "My Repo Name"
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// "next.js" → "Next.js", "html" → "HTML"
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

// Static fallback if GitHub API fails — your existing projects
function getFallbackProjects(): Project[] {
  return [
    {
      id: 1,
      title: "Text Adventure Game",
      description:
        "A command-line text-based adventure game built in Python. Navigate rooms, collect items, and follow branching story paths.",
      longDescription:
        "Built using core Python — functions, loops, conditionals, and dictionaries. Features multiple rooms, item collection, and branching story paths.",
      tech: ["Python"],
      github: "https://github.com/ren-ishh/text-game",
      live: null,
      status: "Completed",
      featured: true,
    },
    {
      id: 2,
      title: "QuickRent",
      description:
        "A clean, responsive rental platform UI concept built to practise real-world front-end layout.",
      longDescription:
        "Demonstrates front-end layout skills through a property listing interface with responsive cards, clean typography, and structured HTML semantics.",
      tech: ["HTML", "CSS"],
      github: "https://github.com/ren-ishh/quickrent",
      live: null,
      status: "Completed",
      featured: true,
    },
    {
      id: 3,
      title: "Student Institution Management",
      description:
        "A JavaScript-driven web app for managing student records and course data with full DOM interactivity.",
      longDescription:
        "Built to practice DOM manipulation, event-driven logic, and data management in the browser.",
      tech: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/ren-ishh/student-institution-management-system",
      live: null,
      status: "Completed",
      featured: true,
    },
  ];
}
