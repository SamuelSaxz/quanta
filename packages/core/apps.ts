import { makeSessionsContainer } from "@auth/modules/sessions/sessions.container";
import { makeUsersContainer } from "@auth/modules/users/users.container";
import { db } from "@db/index";
import { makeHabitContainer } from "@server/modules/habits/habits.container";
import { makeOnboardingContainer } from "@server/modules/onboarding/onboarding.container";

export const apps = {
  users: makeUsersContainer({ db }),
  onboarding: makeOnboardingContainer({ db }),
  sessions: makeSessionsContainer({ db }),
  habits: makeHabitContainer({ db }),
};
