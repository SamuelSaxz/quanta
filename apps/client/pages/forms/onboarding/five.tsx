import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import RadioButton from "@client/components/ui/radio";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useOnboarding } from "@client/context/onboarding-provider";
import { useStep } from "@client/context/step-provider";
import { OnboardingDto } from "@shared/dto/onboarding.dto";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { toast } from "sonner-native";

export default function OnboardingFive() {
  const { nextStep } = useStep();
  const { questionFive, setQuestionValue } = useOnboarding();

  const form = useForm({
    defaultValues: {
      value: questionFive,
    },
    validators: {
      onChange: OnboardingDto.question,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: ({ value: { value: response } }) => {
      setQuestionValue(5, response);

      nextStep();
    },
  });

  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontSize: Sizes["text-2xl"],
          fontWeight: "medium",
          letterSpacing: 1.2,
          marginBottom: Sizes["m-10"],
        }}
      >
        Com que frequência você esquece de fazer coisas que queria lembrar?
      </Text>

      <form.Field name="value">
        {(field) => (
          <View
            style={{
              gap: 24,
              marginBottom: Sizes["m-10"],
              backgroundColor: Colors.dark.surface,
            }}
          >
            <RadioButton
              label="Nunca"
              selected={field.state.value === 1}
              onPress={() => field.handleChange(1)}
            />

            <RadioButton
              label="Raramente"
              selected={field.state.value === 2}
              onPress={() => field.handleChange(2)}
            />

            <RadioButton
              label="Às vezes"
              selected={field.state.value === 3}
              onPress={() => field.handleChange(3)}
            />

            <RadioButton
              label="Frequentemente"
              selected={field.state.value === 4}
              onPress={() => field.handleChange(4)}
            />

            <RadioButton
              label="Quase sempre"
              selected={field.state.value === 5}
              onPress={() => field.handleChange(5)}
            />
          </View>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: Sizes["m-6"],
              backgroundColor: "transparent",
            }}
          >
            <Button
              label={isSubmitting ? "Salvando..." : "Próxima Pergunta"}
              disabled={!canSubmit}
              onPress={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
              }}
            />
          </View>
        )}
      />
    </>
  );
}
