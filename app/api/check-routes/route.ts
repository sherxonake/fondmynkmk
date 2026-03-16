import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js"]);

interface RouteInfo {
  route: string;
  file: string;
}

async function listAdminPages(): Promise<RouteInfo[]> {
  const cwd = process.cwd();
  const appDir = join(cwd, "app");
  const adminDir = join(appDir, "admin");

  async function walk(dir: string): Promise<RouteInfo[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const results: RouteInfo[] = [];

    for (const entry of entries) {
      const entryPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...(await walk(entryPath)));
        continue;
      }

      if (PAGE_FILES.has(entry.name)) {
        const relativeDir = relative(adminDir, dir);
        const routeSuffix = relativeDir ? `/${relativeDir}` : "";
        const route = `/admin${routeSuffix || ""}`;
        results.push({ route, file: relative(appDir, entryPath) });
      }
    }

    return results;
  }

  try {
    return await walk(adminDir);
  } catch (error) {
    console.error("check-routes walk", error);
    return [];
  }
}

export async function GET() {
  const pages = await listAdminPages();
  return NextResponse.json({ ok: true, pages, scannedAt: new Date().toISOString() });
}
