import { View } from "@client/components/Themed";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useStep } from "@client/context/step-provider";
import OnboardingFive from "@client/pages/forms/onboarding/five";
import OnboardingFour from "@client/pages/forms/onboarding/four";
import OnboardingOne from "@client/pages/forms/onboarding/one";
import OnboardingSix from "@client/pages/forms/onboarding/six";
import OnboardingThree from "@client/pages/forms/onboarding/three";
import OnboardingTwo from "@client/pages/forms/onboarding/two";

export default function Onboarding() {
  const { step } = useStep();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: Sizes["p-10"],
        paddingHorizontal: Sizes["p-3"],
        backgroundColor: Colors.dark.surface,
      }}
    >
      {step === 1 && <OnboardingOne />}
      {step === 2 && <OnboardingTwo />}
      {step === 3 && <OnboardingThree />}
      {step === 4 && <OnboardingFour />}
      {step === 5 && <OnboardingFive />}
      {step === 6 && <OnboardingSix />}
    </View>
  );
}
