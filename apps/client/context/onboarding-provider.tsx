import React from "react";

interface OnboardingContextValue {
  questionOne: number;
  questionTwo: number;
  questionThree: number;
  questionFour: number;
  questionFive: number;
  questionSix: number;
  setQuestionValue: (question: number, value: number) => void;
  resetForm: () => void;
}

const initialState = {
  questionOne: 0,
  questionTwo: 0,
  questionThree: 0,
  questionFour: 0,
  questionFive: 0,
  questionSix: 0,
  setQuestionValue: () => {},
  resetForm: () => {},
};

export const OnboardingContext =
  React.createContext<OnboardingContextValue>(initialState);

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questionOne, setQuestionOne] = React.useState(0);
  const [questionTwo, setQuestionTwo] = React.useState(0);
  const [questionThree, setQuestionThree] = React.useState(0);
  const [questionFour, setQuestionFour] = React.useState(0);
  const [questionFive, setQuestionFive] = React.useState(0);
  const [questionSix, setQuestionSix] = React.useState(0);

  const value = React.useMemo<OnboardingContextValue>(
    () => ({
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      questionFive,
      questionSix,
      resetForm() {
        setQuestionOne(0);
        setQuestionTwo(0);
        setQuestionThree(0);
        setQuestionFour(0);
        setQuestionFive(0);
        setQuestionSix(0);
      },
      setQuestionValue: (question, value) => {
        switch (question) {
          case 1:
            setQuestionOne(value);
            break;
          case 2:
            setQuestionTwo(value);
            break;
          case 3:
            setQuestionThree(value);
            break;
          case 4:
            setQuestionFour(value);
            break;
          case 5:
            setQuestionFive(value);
            break;
          case 6:
            setQuestionSix(value);
            break;
        }
      },
    }),
    [questionOne, questionTwo, questionThree, questionFour, questionFive]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = React.useContext(OnboardingContext);
  if (!ctx)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
