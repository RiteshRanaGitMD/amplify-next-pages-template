import { defineFunction } from "@aws-amplify/backend";

export const calculator = defineFunction({
    name: 'calculator',
  entry: "./handler.ts",
});
