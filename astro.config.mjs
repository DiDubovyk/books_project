// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

import node from "@astrojs/node";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  env: {
    schema: {
      SHOW_BUY_BUTTON: envField.boolean({
        default: true,
        context: "server",
        access: "public",
      }),
      SCORE_API_ENDPOINT: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },

  adapter: vercel(),
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      weights: ["200", "300", "400", "600"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      weights: ["200", "300", "400", "500", "600", "800"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.google(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      weights: ["200", "300", "400", "500", "600", "700", "800"],
      styles: ["normal", "italic"],
    },
  ],
  image: {
    domains: ["covers.openlibrary.org"],
  },
});
