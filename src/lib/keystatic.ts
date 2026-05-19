import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const reader = createReader(process.cwd(), config);

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  coverImage: string | null;
  status: "draft" | "published";
  series: string | null;
  seriesOrder: number | null;
};

export type PostWithContent = Post & {
  content: string;
  readTime: number;
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  coverImage: string | null;
  status: "active" | "complete";
};

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function readMdxContent(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), "content", "writing", `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return matter(raw).content;
  } catch {
    return "";
  }
}

async function entryToPost(slug: string): Promise<Post | null> {
  const entry = await reader.collections.writing.read(slug);
  if (!entry) return null;
  return {
    slug,
    title: entry.title,
    publishedAt: entry.publishedAt ?? "",
    excerpt: entry.excerpt,
    coverImage: entry.coverImage ?? null,
    status: entry.status as "draft" | "published",
    series: (entry.series ?? null) as string | null,
    seriesOrder: entry.seriesOrder ?? null,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await reader.collections.writing.list();
  const posts = await Promise.all(slugs.map(entryToPost));
  return posts
    .filter((p): p is Post => p !== null && p.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  const entry = await reader.collections.writing.read(slug);
  if (!entry || entry.status !== "published") return null;
  const content = readMdxContent(slug);
  return {
    slug,
    title: entry.title,
    publishedAt: entry.publishedAt ?? "",
    excerpt: entry.excerpt,
    coverImage: entry.coverImage ?? null,
    status: "published",
    series: (entry.series ?? null) as string | null,
    seriesOrder: entry.seriesOrder ?? null,
    content,
    readTime: estimateReadTime(content),
  };
}

async function entryToSeries(slug: string): Promise<Series | null> {
  const entry = await reader.collections.series.read(slug);
  if (!entry) return null;
  return {
    slug,
    title: entry.title,
    description: entry.description,
    coverImage: entry.coverImage ?? null,
    status: entry.status as "active" | "complete",
  };
}

export async function getAllSeries(): Promise<Series[]> {
  const slugs = await reader.collections.series.list();
  const all = await Promise.all(slugs.map(entryToSeries));
  return all.filter((s): s is Series => s !== null);
}

export async function getSeries(slug: string): Promise<Series | null> {
  return entryToSeries(slug);
}

export async function getPostsInSeries(seriesSlug: string): Promise<Post[]> {
  const slugs = await reader.collections.writing.list();
  const posts = await Promise.all(slugs.map(entryToPost));
  return posts
    .filter((p): p is Post => p !== null && p.series === seriesSlug)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export async function getRelatedPosts(post: Post, limit: number): Promise<Post[]> {
  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== post.slug);
  const seriesFirst = post.series
    ? others.filter((p) => p.series === post.series)
    : [];
  const remaining = others.filter(
    (p) => !post.series || p.series !== post.series,
  );
  return [...seriesFirst, ...remaining].slice(0, limit);
}
