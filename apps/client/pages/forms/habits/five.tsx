import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import ButtonSecondary from "@client/components/ui/button-secondary";
import RadioButton from "@client/components/ui/radio";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useHabits } from "@client/context/habits-provider";
import { useStep } from "@client/context/step-provider";
import { HabitsDto } from "@shared/dto";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { toast } from "sonner-native";

export default function OnboardingFive() {
  const router = useRouter();
  const { nextStep } = useStep();
  const { data, setData } = useHabits();

  const form = useForm({
    defaultValues: {
      value: data.reminderEnabled,
    },
    validators: {
      onChange: HabitsDto.reminderEnabled,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: ({ value: { value: response } }) => {
      setData("reminderEnabled", response);

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
        Você quer receber lembretes?
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
              label="Sim"
              selected={field.state.value === true}
              onPress={() => field.handleChange(true)}
            />

            <RadioButton
              label="Não"
              selected={field.state.value === false}
              onPress={() => field.handleChange(false)}
            />
          </View>
        )}
      </form.Field>

      <View
        style={{
          flexDirection: "row",
          gap: Sizes["m-3"],
          backgroundColor: "transparent",
          marginTop: Sizes["m-18"],
        }}
      >
        <ButtonSecondary
          label="Cancelar"
          onPress={() => {
            router.navigate("/(dashboard)/home");
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              label={isSubmitting ? "Salvando..." : "Próximo"}
              disabled={!canSubmit}
              onPress={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
              }}
            />
          )}
        />
      </View>
    </>
  );
}
