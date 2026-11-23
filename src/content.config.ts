// The recipe model (docs/vision.md § The recipe file): what a recipe page and the list read. The
// build fails on a missing or wrong field. An experiment: the family decides what stays.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_IDS, KIDS_IDS, SPICE, STATUS_IDS } from './recipes/labels';

/** Strict: in a YAML flow mapping a comma ends the value, so a name with a comma is quoted. */
const ingredient = z.strictObject({
  name: z.string(),
  amount: z.number().positive().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
  product: z.string().optional(),
  /** Nice to have: shown as such, and the finder never counts it as missing. */
  optional: z.boolean().optional(),
});

const recipes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/recipes' }),
  schema: z.strictObject({
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.enum(CATEGORY_IDS)).min(1),
    status: z.enum(STATUS_IDS),
    servings: z.number().int().positive(),
    time: z.strictObject({
      /** Hands-on minutes. */
      active: z.number().int().positive(),
      /** Start to plate, minutes. */
      total: z.number().int().positive(),
    }),
    spice: z
      .number()
      .int()
      .min(0)
      .max(SPICE.length - 1)
      .optional(),
    kids: z.enum(KIDS_IDS).optional(),
    /** A dish of several parts (cutlet, potatoes, salad) has a section per part. */
    ingredients: z
      .array(z.strictObject({ title: z.string().optional(), items: z.array(ingredient).min(1) }))
      .min(1),
    steps: z
      .array(z.strictObject({ title: z.string().optional(), items: z.array(z.string()).min(1) }))
      .min(1),
    sources: z.array(z.strictObject({ title: z.string(), url: z.url() })),
  }),
});

export const collections = { recipes };
