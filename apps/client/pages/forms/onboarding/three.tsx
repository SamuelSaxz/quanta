import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import RadioButton from "@client/components/ui/radio";
import Sizes from "@client/constants/Sizes";
import { useOnboarding } from "@client/context/onboarding-provider";
import { useStep } from "@client/context/step-provider";
import { OnboardingDto } from "@shared/dto/onboarding.dto";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { toast } from "sonner-native";

export default function OnboardingThree() {
  const { nextStep } = useStep();
  const { questionThree, setQuestionValue } = useOnboarding();

  const form = useForm({
    defaultValues: {
      value: questionThree,
    },
    validators: {
      onChange: OnboardingDto.question,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: ({ value: { value: response } }) => {
      setQuestionValue(3, response);

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
        Quando você quer começar algo novo, quão fácil é dar o primeiro passo?
      </Text>

      <form.Field name="value">
        {(field) => (
          <View
            style={{
              gap: 24,
              marginBottom: Sizes["m-10"],
              backgroundColor: "transparent",
            }}
          >
            <RadioButton
              label="Muito difícil"
              selected={field.state.value === 1}
              onPress={() => field.handleChange(1)}
            />
            <RadioButton
              label="Difícil"
              selected={field.state.value === 2}
              onPress={() => field.handleChange(2)}
            />
            <RadioButton
              label="Ok"
              selected={field.state.value === 3}
              onPress={() => field.handleChange(3)}
            />
            <RadioButton
              label="Fácil"
              selected={field.state.value === 4}
              onPress={() => field.handleChange(4)}
            />
            <RadioButton
              label="Muito fácil"
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
