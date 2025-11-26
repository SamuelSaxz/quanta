import type { DBOrTX } from "@db/index";

export type GlobalRepositoryMethods<I, U, R extends { id: unknown }> = {
  create: (values: I) => Promise<R | undefined>;
  delete: (id: R["id"]) => Promise<void>;
  findAll: () => Promise<R[]>;
  findById: (id: R["id"]) => Promise<R | undefined>;
  update: (id: R["id"], values: U) => Promise<R | undefined>;
};

export type GlobalRepositoryBase<
  I,
  U,
  R extends { id: unknown },
  Deps = { db: DBOrTX },
> = (deps: Deps) => GlobalRepositoryMethods<I, U, R>;

export type GlobalMapper<Output extends Record<string, any> = {}> =
  () => Output;

export interface GlobalDependencies<
  R extends Record<string, (...args: any) => any> = {},
  M extends Record<string, GlobalMapper> = {},
  C extends Record<string, any> = {},
> {
  db: DBOrTX;
  repository: R;
  mapper: M;
  container: C;
}

export type GlobalService<
  R extends Record<string, (...args: any) => any> = {},
  M extends Record<string, GlobalMapper> = {},
  C extends Record<string, any> = {},
  Output extends Record<string, any> = {},
> = (deps: GlobalDependencies<R, M, C>) => Output;

export type ExtendRepository<Base extends object, Extra extends object> = Base &
  Extra;

export type PickMethods<Base extends object, Keys extends keyof Base> = Pick<
  Base,
  Keys
>;

export type OmitMethods<Base extends object, Keys extends keyof Base> = Omit<
  Base,
  Keys
>;

export type GlobalRepository<
  I,
  U,
  R extends { id: unknown },
  Extra extends object = {},
  Picked extends keyof GlobalRepositoryMethods<
    I,
    U,
    R
  > = keyof GlobalRepositoryMethods<I, U, R>,
  Omitted extends keyof GlobalRepositoryMethods<I, U, R> = never,
  Deps = { db: DBOrTX },
> = (
  deps: Deps
) => Omit<Pick<GlobalRepositoryMethods<I, U, R>, Picked>, Omitted> & Extra;

export type GlobalContainer<
  M extends Record<string, GlobalMapper>,
  S extends ReturnType<GlobalService<any, any, any, any>>,
> = (deps: { db: DBOrTX }) => {
  mapper: M;
  service: S;
};
