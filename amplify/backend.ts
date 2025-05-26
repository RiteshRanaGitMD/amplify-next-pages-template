import { sayHello } from "./functions/say-hello/resource";
import { calculator } from "./functions/calculator/resource";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

defineBackend({
  auth,
  data,
  sayHello,
  calculator,
});
