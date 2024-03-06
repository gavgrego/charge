import { defineConfig } from "orval";
export default defineConfig({
  strapi: {
    input: "./data/openapi.json",
    output: {
      target: "./data/api",
      client: "react-query",
      mode: "tags-split",
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: "npx prettier --write",
    },
  },
});
