import { CodegenConfig } from "@graphql-codegen/cli";
import path from "path";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: "client/**/*.graphql",
  generates: {
    "server/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "client/vite/generated/": {
      preset: "client",
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
