import { supabase } from "./supabase";

type LatencyResult = {
  elapsedMs: number;
};

const measureLatency = (): (() => LatencyResult) => {
  const start = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
  return () => {
    const end = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
    return { elapsedMs: Math.round(end - start) };
  };
};

export type ProbeStatus = {
  id: "db" | "storage";
  ok: boolean;
  label: string;
  detail: string;
  latencyMs: number;
  error?: string;
};

export async function checkSiteSettingsHealth(): Promise<boolean> {
  try {
    const { error } = await supabase.from("site_settings").select("address").limit(1);
    return !error;
  } catch (error) {
    console.error("checkSiteSettingsHealth", error);
    return false;
  }
}

export async function assertAdminHealth(): Promise<void> {
  const checks = [
    supabase.from("site_settings").select("address").limit(1),
    supabase.from("news_articles").select("id").limit(1),
  ];

  const results = await Promise.all(checks);
  const failure = results.find((result) => result.error);

  if (failure?.error) {
    throw new Error(`Admin health check failed: ${failure.error.message}`);
  }
}

export async function getDatabaseStatus(): Promise<ProbeStatus> {
  const endTimer = measureLatency();
  try {
    const [{ error: siteError }, { error: newsError }] = await Promise.all([
      supabase.from("site_settings").select("id", { head: true }).limit(1),
      supabase.from("news_articles").select("id", { head: true }).limit(1),
    ]);

    if (siteError || newsError) {
      const reason = siteError?.message ?? newsError?.message ?? "Unknown Supabase error";
      return {
        id: "db",
        ok: false,
        label: "Supabase DB",
        detail: "Ошибка чтения таблиц",
        latencyMs: endTimer().elapsedMs,
        error: reason,
      };
    }

    return {
      id: "db",
      ok: true,
      label: "Supabase DB",
      detail: "site_settings + news_articles",
      latencyMs: endTimer().elapsedMs,
    };
  } catch (error) {
    const { elapsedMs } = endTimer();
    const message = error instanceof Error ? error.message : "Unknown database error";
    return {
      id: "db",
      ok: false,
      label: "Supabase DB",
      detail: "Исключение на уровне клиента",
      latencyMs: elapsedMs,
      error: message,
    };
  }
}

export async function getStorageStatus(): Promise<ProbeStatus> {
  const endTimer = measureLatency();
  try {
    const { data, error } = await supabase.storage.from("news-images").list(undefined, { limit: 1 });
    if (error) {
      console.error("getStorageStatus.list", error);
      return {
        id: "storage",
        ok: false,
        label: "Supabase Storage",
        detail: "news-images bucket",
        latencyMs: endTimer().elapsedMs,
        error: error.message,
      };
    }

    return {
      id: "storage",
      ok: Array.isArray(data),
      label: "Supabase Storage",
      detail: "news-images bucket",
      latencyMs: endTimer().elapsedMs,
      error: Array.isArray(data) ? undefined : "Ответ не является массивом",
    };
  } catch (error) {
    console.error("getStorageStatus", error);
    const { elapsedMs } = endTimer();
    return {
      id: "storage",
      ok: false,
      label: "Supabase Storage",
      detail: "news-images bucket",
      latencyMs: elapsedMs,
      error: error instanceof Error ? error.message : "Unknown storage error",
    };
  }
}

export async function checkStorageHealth(): Promise<boolean> {
  const status = await getStorageStatus();
  return status.ok;
}
