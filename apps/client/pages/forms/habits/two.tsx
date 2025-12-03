import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import ButtonSecondary from "@client/components/ui/button-secondary";
import RadioButton from "@client/components/ui/radio";
import Sizes from "@client/constants/Sizes";
import { useHabits } from "@client/context/habits-provider";
import { useStep } from "@client/context/step-provider";
import { HabitsDto } from "@shared/dto";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { toast } from "sonner-native";

export default function OnboardingTwo() {
  const router = useRouter();
  const { nextStep } = useStep();
  const { data, setData } = useHabits();

  const form = useForm({
    defaultValues: {
      value: data.type,
    },
    validators: {
      onChange: HabitsDto.type,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: ({ value: { value: response } }) => {
      setData("type", response);

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
          marginBottom: Sizes["m-18"],
        }}
      >
        Esse hábito será de que tipo?
      </Text>

      <form.Field name="value">
        {(field) => (
          <View
            style={{
              gap: 24,
              marginBottom: Sizes["m-18"],
              backgroundColor: "transparent",
            }}
          >
            <RadioButton
              label="Marcar como feito"
              selected={field.state.value === "check"}
              onPress={() => field.handleChange("check")}
            />

            <RadioButton
              label="Repetição"
              selected={field.state.value === "repeat"}
              onPress={() => field.handleChange("repeat")}
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
