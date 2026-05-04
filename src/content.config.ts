import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { file } from "astro/loaders";
import { parse } from "csv-parse/sync";

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

const goodreads = defineCollection({
  loader: file("src/content/goodreads_library_export.csv", {
    parser: (text) => {
      const records = parse(text, {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true,
      });
      return records.map((row: any) => ({
        ...row,
        id: row.Book_Id,
      }));
    },
  }),
  schema: z.object({
    Title: z.string(),
    Author: z.string(),
    ISBN13: z.string(),
    My_Rating: z.coerce.number(),
  }),
});

export const collections = { books, goodreads };
