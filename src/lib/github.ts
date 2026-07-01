// src/lib/github.ts — repos you've starred on GitHub, daily ISR

import type { Project } from "@/types";

const USER = "ren-ishh";

export async function getGitHubProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/starred`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return [];

    const repos = await res.json();

    return repos
      .filter((r: any) => r.owner?.login === USER)
      .map((r: any, i: number): Project => ({
        id: r.id,
        title: r.name,
        description: r.description ?? "",
        longDescription: r.description ?? "",
        tech: r.language ? [r.language] : [],
        github: r.html_url,
        live: r.homepage || null,
        status: r.archived ? "archived" : "active",
        featured: i < 3,
      }));
  } catch (err) {
    console.error("Failed to fetch starred repos:", err);
    return [];
  }
}
