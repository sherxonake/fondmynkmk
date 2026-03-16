import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

export const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
  },
});

export async function ensureStorageBucket(): Promise<void> {
  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("ensureStorageBucket.listBuckets", error);
    return;
  }

  const exists = buckets?.some((bucket) => bucket.name === "news-images");

  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket("news-images", {
      public: true,
    });

    if (createError) {
      console.error("ensureStorageBucket.createBucket", createError);
    }
  }
}
