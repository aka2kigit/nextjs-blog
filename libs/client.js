// libs/client.js
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "aka2ki",
  apiKey: process.env.API_KEY,
});
