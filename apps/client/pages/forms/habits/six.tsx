import { habitsClient } from "@client/api/habits";
import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import ButtonSecondary from "@client/components/ui/button-secondary";
import Input from "@client/components/ui/input";
import RadioButton from "@client/components/ui/radio";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useHabits } from "@client/context/habits-provider";
import { HabitsDto } from "@shared/dto";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { toast } from "sonner-native";

export default function OnboardingSix() {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const { data, setData } = useHabits();

  const form = useForm({
    defaultValues: {
      value: data.motivation,
    },
    validators: {
      onChange: HabitsDto.motivation,
    },
    onSubmitInvalid: () => {
      toast.error("Escolha uma das opções!");
    },
    onSubmit: async ({ value: { value: response } }) => {
      setData("motivation", response);

      const { message } = await habitsClient.api.create({
        body: data,
      });

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
        O que te motiva a criar esse hábito?
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
              label="Saúde"
              selected={value === "health"}
              onPress={() => {
                setValue("health");
                field.handleChange("health");
              }}
            />

            <RadioButton
              label="Produtividade"
              selected={value === "productivity"}
              onPress={() => {
                setValue("productivity");
                field.handleChange("productivity");
              }}
            />

            <RadioButton
              label="Bem-estar"
              selected={value === "well-being"}
              onPress={() => {
                setValue("well-being");
                field.handleChange("well-being");
              }}
            />

            <RadioButton
              label="Foco"
              selected={value === "focus"}
              onPress={() => {
                setValue("focus");
                field.handleChange("focus");
              }}
            />

            <RadioButton
              label="Outro"
              selected={value === "other"}
              onPress={() => {
                setValue("other");
                field.handleChange("");
              }}
            />

            {value == "other" && (
              <Input
                field={field}
                label=""
                placeholder="Digite o motivo"
                defaultValue={data.motivation}
                onChangeText={(text) => field.handleChange(text)}
              />
            )}
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
