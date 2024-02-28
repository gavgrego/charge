module.exports = {
  charges: {
    output: {
      mode: "tags-split",
      target: "./data/api",
      schemas: "src/model",
      client: "react-query",
    },
    input: "./data/openapi.json",
  },
};
