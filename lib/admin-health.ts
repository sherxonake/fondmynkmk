import { supabase } from "./supabase";

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

export async function checkStorageHealth(): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage.from("news-images").list(undefined, { limit: 1 });
    if (error) {
      console.error("checkStorageHealth.list", error);
      return false;
    }
    return Array.isArray(data);
  } catch (error) {
    console.error("checkStorageHealth", error);
    return false;
  }
}
