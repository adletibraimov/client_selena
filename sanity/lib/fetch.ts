import { type QueryParams } from "next-sanity";

import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

export async function sanityFetch<T>({
  query,
  params = {},
  tags = ["page"],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    ...(token ? { token } : {}),
    cache: "no-store",
    next: {
      tags,
    },
  });
}
