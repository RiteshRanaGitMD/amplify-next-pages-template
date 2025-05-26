import { defineFunction } from "@aws-amplify/backend";

export const calculator = defineFunction({
  entry: "./handler.ts",
});
