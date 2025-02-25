import { defineCollection, z } from "astro:content";
import { file } from 'astro/loaders';


const bookmarks = defineCollection({
    schema: z.object({
        pageTitle: z.string(),
        url: z.string(),
        description: z.string().optional()
    }),
    loader: file("src/data/bookmarks.json"),
});
    
export const collections = { bookmarks };