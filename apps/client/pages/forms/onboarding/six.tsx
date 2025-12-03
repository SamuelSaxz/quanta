import { onboardingClient } from "@client/api/onboarding";
import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import RadioButton from "@client/components/ui/radio";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useOnboarding } from "@client/context/onboarding-provider";
import { OnboardingDto } from "@shared/dto/onboarding.dto";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { toast } from "sonner-native";

export default function OnboardingSix() {
  const router = useRouter();

  const {
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
    questionSix,
    setQuestionValue,
  } = useOnboarding();

  const form = useForm({
    defaultValues: {
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      questionFive,
      questionSix,
    },
    validators: {
      onChange: OnboardingDto.create,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: async ({ value }) => {
      setQuestionValue(6, value.questionSix);

      const { message } = await onboardingClient.api.create({ body: value });

      toast.success(message);

      router.navigate("/(dashboard)/home");
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
        Você age mais quando...
      </Text>

      <form.Field name="questionSix">
        {(field) => (
          <View
            style={{
              gap: 24,
              marginBottom: Sizes["m-10"],
              backgroundColor: Colors.dark.surface,
            }}
          >
            <RadioButton
              label="Alguém lembra você"
              selected={field.state.value === 1}
              onPress={() => field.handleChange(1)}
            />

            <RadioButton
              label="Recebe notificações"
              selected={field.state.value === 2}
              onPress={() => field.handleChange(2)}
            />

            <RadioButton
              label="Está motivado"
              selected={field.state.value === 3}
              onPress={() => field.handleChange(3)}
            />

            <RadioButton
              label="Há uma rotina definida"
              selected={field.state.value === 4}
              onPress={() => field.handleChange(4)}
            />

            <RadioButton
              label="Decide sozinho na hora"
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
              label={isSubmitting ? "Enviando..." : "Finalizar Avaliação"}
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
