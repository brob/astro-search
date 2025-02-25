import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import Fuse from "fuse.js";
import { getCollection } from "astro:content";

export const server = {
  search: defineAction({
    schema: z.object({
      query: z.string(),
    }),
    handler: async (query) => {
      const bookmarks = await getCollection("bookmarks");

      const fuse = new Fuse(bookmarks, {
        threshold: 0.3,
        keys: [
          { name: "data.pageTitle", weight: 1.0 },
          { name: "data.description", weight: 0.7 },
          { name: "data.url", weight: 0.3 },
        ],
      });

      const results = await fuse.search(query);

      console.log({ results });
      return results;
    },
  }),
};
