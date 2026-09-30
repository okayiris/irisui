// The asset store a preview points at: /_blob/<id>. The release lists those blobs but does not always carry
// their bytes, so the build maps each one to a file we have, or to a deliberate placeholder.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./parse";
import { url } from "./base";

export type Blob = { id: string; group: string; name: string; served: boolean; size: number };

let cache: Map<string, Blob> | null = null;

/** Every blob the release records, with whether this repo can serve it. */
export function loadBlobs(): Map<string, Blob> {
  if (cache) return cache;
  cache = new Map();
  const manifest = JSON.parse(readFileSync(join(ROOT, "public", "ds", "design-system.json"), "utf8"));
  for (const [group, g] of Object.entries<any>(manifest.assetGroups ?? {})) {
    for (const [name, rec] of Object.entries<any>(g.files ?? {})) {
      const id = String(rec.blob ?? "");
      if (!id) continue;
      cache.set(id, {
        id,
        group,
        name,
        served: existsSync(join(ROOT, "public", "blobs", id)),
        size: Number(rec.size ?? 0),
      });
    }
  }
  return cache;
}

/** The blobs a release does not carry, for the site's own note about it. */
export function missingBlobs(): Blob[] {
  return Array.from(loadBlobs().values()).filter((b) => !b.served);
}

/**
 * Point every `/_blob/<id>` in a preview at what we have: the file itself, or a placeholder that says so.
 * The stores we do not carry are the ones a reader would otherwise see as broken images.
 */
export function rewriteBlobs(html: string): string {
  const blobs = loadBlobs();
  return html.replace(/\/_blob\/([a-f0-9]{16,})/gi, (whole, id: string) => {
    const blob = blobs.get(id);
    if (!blob) return whole;
    if (blob.served) return url(`/blobs/${id}`);
    return url("/ds/placeholder.svg");
  });
}
