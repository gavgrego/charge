import { defineConfig } from "orval";
export default defineConfig({
  strapi: {
    input:
      "../strapi/src/extensions/documentation/documentation/1.0.0/full_documentation.json",
    output: {
      target: "./data/api",
      mode: "tags-split",
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: "npx prettier --write",
    },
  },
});
