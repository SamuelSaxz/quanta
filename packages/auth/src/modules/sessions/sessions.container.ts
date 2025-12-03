import type { SessionsService } from "@auth/modules/sessions/sessions.contracts";
import { SessionsRepositoryFn } from "@auth/modules/sessions/sessions.repository";
import { SessionsServiceFn } from "@auth/modules/sessions/sessions.service";
import type { GlobalContainer } from "@shared/config";

export const makeSessionsContainer: GlobalContainer<
  {},
  ReturnType<SessionsService>
> = function ({ db: injectedDb }) {
  const dependencies = {
    db: injectedDb,
    mapper: {},
    repository: {
      sessions: SessionsRepositoryFn,
    },
    container: {},
  };

  const service = SessionsServiceFn(dependencies);

  return {
    mapper: dependencies.mapper,
    service,
  };
};
