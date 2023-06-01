import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [partytown(), react(), vue(), tailwind()]
});