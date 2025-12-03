import type {
  GlobalMapper,
  GlobalRepository,
  GlobalRepositoryMethods,
  GlobalService,
} from "@shared/config";
import type { User } from "@shared/types";
import type {
  InsertSession,
  Session,
  UpdateSession,
} from "@shared/types/sessions.types";

export type SessionsRepository = GlobalRepository<
  InsertSession,
  UpdateSession,
  Session,
  {
    find: (
      sessionId: Session["id"],
      userId: User["id"]
    ) => Promise<Session | undefined>;
    findById: (id: Session["id"]) => Promise<Session | undefined>;
    findByUserId: (userId: User["id"]) => Promise<Session | undefined>;
  },
  keyof GlobalRepositoryMethods<InsertSession, UpdateSession, Session>,
  "findAll" | "delete"
>;

export type SessionsMapper = GlobalMapper<{}>;

export interface SessionsDependencies {
  repository: { sessions: SessionsRepository };
  mapper: { sessions: SessionsMapper };
}

export type SessionsService = GlobalService<
  SessionsDependencies["repository"],
  {},
  {},
  {
    create: (deps: { userId: User["id"] }) => Promise<{
      accessToken: string;
    }>;
    find: (deps: {
      sessionId: Session["id"];
      userId: User["id"];
    }) => Promise<Session>;
    getById: (deps: { sessionId: Session["id"] }) => Promise<Session>;
    getByUserId: (deps: { userId: User["id"] }) => Promise<Session>;
    refresh: (deps: {
      sessionId: Session["id"];
      userId: User["id"];
    }) => Promise<{ accessToken: string }>;
    verify: (deps: {
      sessionId: Session["id"];
      userId: User["id"];
    }) => Promise<Session>;
    update: (deps: {
      id: Session["id"];
      values: UpdateSession;
    }) => Promise<Session>;
  }
>;
