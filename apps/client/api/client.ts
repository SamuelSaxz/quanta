import type { AppType } from "@server/index";
import { hc } from "hono/client";

const API_BASE_URL: string = process.env.EXPO_PUBLIC_API_BASE_URL!;

console.log("📦 Client:", API_BASE_URL);

export const client = hc<AppType>(API_BASE_URL, {
  init: {
    credentials: "include",
  },
});

let accessToken: string | null = null;

export const Token = {
  get: function () {
    return accessToken;
  },
  set: function (token: string) {
    accessToken = token;
  },
  clear: function () {
    accessToken = null;
  },
};
