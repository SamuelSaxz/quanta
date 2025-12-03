import React from "react";

type StepContext = {
  step: number;
  maxLength: number;
  setMaxLength: (length: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
};

const StepContext = React.createContext<StepContext | undefined>(undefined);

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = React.useState(1);
  const [length, setLength] = React.useState(0);

  const value = {
    step,
    maxLength: length,
    setMaxLength: (length: number) => {
      setLength(length);
    },
    nextStep: () => {
      if (step === length) return;

      setStep((step) => step + 1);
    },
    prevStep: () => {
      if (step === 1) return;

      setStep((step) => step - 1);
    },
    resetStep: () => {
      setStep(1);
    },
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}

export function useStep() {
  const value = React.useContext(StepContext);

  if (!value) {
    throw new Error("useStep must be used within a StepProvider");
  }

  return value;
}
