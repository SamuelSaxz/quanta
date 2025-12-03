import type { CreateOnboardingDto } from "@shared/types";
import type { RequestError } from "@shared/utils";
import { toast } from "sonner-native";
import { client, Token } from "./client";

export const onboardingClient = {
  api: {
    create: async function (deps: { body: CreateOnboardingDto }) {
      const response = await client.auth.onboarding.create.$post(
        {
          json: deps.body,
        },
        {
          headers: {
            Authorization: `Bearer ${Token.get()}`,
          },
        }
      );

      if (!response.ok) {
        const raw = (await response.json()) as unknown;
        const data = raw as RequestError;

        toast.error(data.error.message);
        throw new Error(data.error.message);
      }

      const result = await response.json();

      return result;
    },
  },
};
