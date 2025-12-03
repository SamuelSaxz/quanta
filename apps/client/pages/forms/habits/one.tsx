import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import ButtonSecondary from "@client/components/ui/button-secondary";
import Input from "@client/components/ui/input";
import Sizes from "@client/constants/Sizes";
import { useHabits } from "@client/context/habits-provider";
import { useStep } from "@client/context/step-provider";
import { HabitsDto } from "@shared/dto";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { toast } from "sonner-native";

export default function HabitsOne() {
  const router = useRouter();
  const { nextStep, resetStep } = useStep();
  const { data, resetData, setData } = useHabits();

  const form = useForm({
    defaultValues: {
      value: data.name,
    },
    validators: {
      onChange: HabitsDto.name,
    },
    onSubmitInvalid: () => {
      toast.error("Insira um nome para o hábito!");
    },
    onSubmit: ({ value: { value: response } }) => {
      setData("name", response);

      nextStep();
    },
  });

  React.useEffect(() => {
    resetStep();
    resetData();
  }, []);

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
        Qual hábito você quer criar?
      </Text>

      <form.Field name="value">
        {(field) => (
          <Input
            field={field}
            label=""
            placeholder="Digite o nome do hábito"
            value={field.state.value}
            onChangeText={(text) => field.handleChange(text)}
          />
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
