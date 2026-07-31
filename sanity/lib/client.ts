import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN can serve stale content after publish; hit API directly for fresh data.
  useCdn: false,
  perspective: "published",
});
