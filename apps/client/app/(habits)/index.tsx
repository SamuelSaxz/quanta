import { View } from "@client/components/Themed";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useStep } from "@client/context/step-provider";
import HabitsFive from "@client/pages/forms/habits/five";
import HabitsFour from "@client/pages/forms/habits/four";
import HabitsOne from "@client/pages/forms/habits/one";
import HabitsSix from "@client/pages/forms/habits/six";
import HabitsThree from "@client/pages/forms/habits/three";
import HabitsTwo from "@client/pages/forms/habits/two";

export default function Habits() {
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
      {step === 1 && <HabitsOne />}
      {step === 2 && <HabitsTwo />}
      {step === 3 && <HabitsThree />}
      {step === 4 && <HabitsFour />}
      {step === 5 && <HabitsFive />}
      {step === 6 && <HabitsSix />}
    </View>
  );
}
