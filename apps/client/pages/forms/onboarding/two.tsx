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

export default function OnboardingTwo() {
  const { nextStep } = useStep();
  const { questionTwo, setQuestionValue } = useOnboarding();

  const form = useForm({
    defaultValues: {
      value: questionTwo,
    },
    validators: {
      onChange: OnboardingDto.question,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: ({ value: { value: response } }) => {
      setQuestionValue(2, response);

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
        Com o passar dos dias, sua motivação normalmente…
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
              label="Cai muito rápido"
              selected={field.state.value === 1}
              onPress={() => field.handleChange(1)}
            />
            <RadioButton
              label="Cai um pouco"
              selected={field.state.value === 2}
              onPress={() => field.handleChange(2)}
            />
            <RadioButton
              label="Fica mais ou menos estável"
              selected={field.state.value === 3}
              onPress={() => field.handleChange(3)}
            />
            <RadioButton
              label="Continua boa"
              selected={field.state.value === 4}
              onPress={() => field.handleChange(4)}
            />
            <RadioButton
              label="Aumenta"
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
