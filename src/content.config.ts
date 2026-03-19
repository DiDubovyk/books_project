import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishYear: z.number(),
    rating: z.number().min(1).max(5),
    cover: z.string(),
    description: z.string(),
    buy: z.object({
      spain: z.url(),
      usa: z.url(),
    }),
  }),
});

export const collections = { books };
