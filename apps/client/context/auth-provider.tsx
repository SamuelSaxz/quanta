import { client, Token } from "@client/api/client";
import type {
  CreateUsersDto,
  LoginUsersDto,
  Onboarding,
  UserSafe,
} from "@shared/types";
import type { RequestError } from "@shared/utils";
import type { InferResponseType } from "hono";
import React from "react";
import { toast } from "sonner-native";

export type AuthContextType = {
  authenticated: boolean;
  token: string | null;
  exp: number | null;
  doRefresh: () => Promise<void>;
  getUser: (deps: { token: string }) => Promise<UserSafe>;
  getOnboarding: ({ token }: { token: string }) => Promise<Onboarding | null>;
  user: UserSafe | null;
  onboarding: Onboarding | null;
  loading: boolean;
  register: (deps: {
    values: CreateUsersDto;
  }) => Promise<InferResponseType<typeof client.auth.register.$post>>;
  login: (deps: {
    values: LoginUsersDto;
  }) => Promise<InferResponseType<typeof client.auth.login.$post>>;
  logout: () => Promise<InferResponseType<typeof client.auth.logout.$get>>;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Informações que devem ser guardadas
  const [token, setToken] = React.useState<AuthContextType["token"]>(null);
  const [exp, setExp] = React.useState<AuthContextType["exp"]>(null);
  const [user, setUser] = React.useState<AuthContextType["user"]>(null);
  const [onboarding, setOnboarding] =
    React.useState<AuthContextType["onboarding"]>(null);

  // Informações para alteração de estados
  const [loading, setLoading] = React.useState(true);

  // Evita corrida de múltiplos refresh simultâneos
  const refreshingRef = React.useRef<Promise<void> | null>(null);

  const setAuth = (deps: {
    token: string;
    exp: number;
    user: UserSafe;
    onboarding: Onboarding | null;
  }) => {
    setToken(deps.token);
    Token.set(deps.token);
    setExp(deps.exp);
    setUser(deps.user);
    setOnboarding(deps.onboarding);
  };

  const clear = () => {
    setToken(null);
    Token.clear();
    setExp(null);
    setUser(null);
    setOnboarding(null);
  };

  async function getUser({ token }: { token: string }) {
    const response = await client.auth.$get(
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    return {
      ...result.data,
      createdAt: new Date(result.data.createdAt),
      updatedAt: new Date(result.data.updatedAt),
    };
  }

  async function getOnboarding({ token }: { token: string }) {
    const response = await client.auth.onboarding.$get(
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return {
      ...result.data,
      createdAt: new Date(result.data.createdAt),
      updatedAt: new Date(result.data.updatedAt),
    };
  }

  async function doRefresh() {
    if (!refreshingRef.current) {
      refreshingRef.current = (async () => {
        try {
          const response = await client.auth.refresh.$get();

          if (!response.ok) {
            const raw = (await response.json()) as unknown;
            const data = raw as RequestError;
            throw new Error(data.error.message);
          }

          const result = await response.json();

          const token = result.data.accessToken;

          const accessTtl = Number(process.env.EXPO_PUBLIC_ACCESS_TTL!);

          const exp = new Date(Date.now() + 1000 * accessTtl).getTime();

          const user = await getUser({ token });

          const onboarding = await getOnboarding({ token });

          setAuth({
            token,
            exp,
            user,
            onboarding,
          });
        } finally {
          refreshingRef.current = null;
        }
      })();
    }

    await refreshingRef.current;
  }

  React.useEffect(() => {
    (async () => {
      try {
        await doRefresh();
      } catch {
        clear();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const value = React.useMemo<AuthContextType>(
    () => ({
      authenticated: !!token,
      exp,
      loading,
      user,
      onboarding,
      token,
      // functions
      doRefresh,
      getUser,
      getOnboarding,
      login: async ({ values }) => {
        const response = await client.auth.login.$post({
          json: values,
        });

        if (!response.ok) {
          const raw = (await response.json()) as unknown;
          const data = raw as RequestError;

          toast.error(data.error.message);
          throw new Error(data.error.message);
        }

        const result = await response.json();

        const accessTtl = Number(process.env.EXPO_PUBLIC_ACCESS_TTL!);

        const onboarding = await getOnboarding({
          token: result.data.accessToken,
        });

        setAuth({
          token: result.data.accessToken,
          exp: Date.now() + 1000 * accessTtl,
          user: {
            ...result.data.user,
            createdAt: new Date(result.data.user.createdAt),
            updatedAt: new Date(result.data.user.updatedAt),
          },
          onboarding,
        });

        return result;
      },
      logout: async () => {
        const response = await client.auth.logout.$get(
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const raw = (await response.json()) as unknown;
          const data = raw as RequestError;

          toast.error(data.error.message);
          throw new Error(data.error.message);
        }

        clear();

        return await response.json();
      },
      register: async ({ values }) => {
        const response = await client.auth.register.$post({
          json: values,
        });

        const result = await response.json();

        const accessTtl = Number(process.env.EXPO_PUBLIC_ACCESS_TTL!);

        setAuth({
          token: result.data.accessToken,
          exp: Date.now() + 1000 * accessTtl,
          user: {
            ...result.data.user,
            createdAt: new Date(result.data.user.createdAt),
            updatedAt: new Date(result.data.user.updatedAt),
          },
          onboarding: null,
        });

        return result;
      },
    }),
    [token, exp, loading]
  ) satisfies AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
