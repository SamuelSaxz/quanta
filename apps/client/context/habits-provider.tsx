import type { Habit } from "@shared/types";
import React from "react";

interface HabitData {
  name: string;
  type: Habit["type"];
  repeatTarget: number | undefined;
  frequency: Habit["frequency"];
  frequencyDays: number[];
  preferredTime: Habit["preferredTime"];
  reminderEnabled: boolean;
  motivation: string;
}

interface HabitsContextValue {
  data: HabitData;
  setData: <K extends keyof HabitData>(key: K, value: HabitData[K]) => void;
  resetData: () => void;
}

const initialState: HabitData = {
  name: "",
  type: "check",
  repeatTarget: undefined,
  frequency: "all_days",
  frequencyDays: [],
  preferredTime: "any_time",
  reminderEnabled: true,
  motivation: "",
};

export const HabitsContext = React.createContext<
  HabitsContextValue | undefined
>(undefined);

export default function HabitsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setDataState] = React.useState(initialState);

  const setData = <K extends keyof HabitData>(key: K, value: HabitData[K]) => {
    setDataState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetData = () => {
    setDataState(initialState);
  };

  const value = React.useMemo(() => ({ data, setData, resetData }), [data]);

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = React.useContext(HabitsContext);

  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }

  return context;
}
