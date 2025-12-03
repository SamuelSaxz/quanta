import { Text, View } from "@client/components/Themed";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import type { AnyFieldApi } from "@tanstack/react-form";
import { CircleAlert, Eye, EyeClosed } from "lucide-react-native";
import React from "react";
import { Pressable, TextInput, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  field: AnyFieldApi;
  label: string;
}

export default function Input({
  label,
  field,
  secureTextEntry,
  ...props
}: InputProps) {
  React.useEffect(() => {
    console.log("📦 Field:", field.name, {
      value: field.state.value,
      isValid: field.state.meta.isValid,
      errors: field.state.meta.errors,
    });
  }, [field.state.value, field.state.meta]);

  const [hidden, setHidden] = React.useState(secureTextEntry ?? false);

  const error =
    !field.state.meta.isValid && field.state.meta.errors.length > 0
      ? field.state.meta.errors[0].message
      : undefined;

  return (
    <View style={{ backgroundColor: Colors.dark.surface }}>
      <Text style={{ marginBottom: Sizes["m-2"] }}>{label}</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors["dark"]["surface"],
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 40,
            paddingHorizontal: Sizes["p-3"],
            paddingVertical: Sizes["p-2"],
            borderRadius: Sizes["rounded-md"],
            backgroundColor: Colors["dark"]["surface-variant"],
            borderWidth: 1,
            borderColor: Colors["dark"]["outline-surface-variant"],
            color: Colors["dark"]["on-surface"],
          }}
          placeholderTextColor={Colors["dark"]["placeholder"]}
          secureTextEntry={hidden}
          {...props}
        />

        {secureTextEntry && (
          <Pressable
            onPress={() => setHidden(!hidden)}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: Sizes["m-2"],
              backgroundColor: Colors["dark"]["surface-elevated"],
              borderRadius: Sizes["rounded-md"],
            }}
          >
            {hidden ? (
              <EyeClosed
                width={20}
                color={Colors.dark["on-surface-elevated"]}
              />
            ) : (
              <Eye width={20} color={Colors.dark["on-surface-elevated"]} />
            )}
          </Pressable>
        )}
      </View>

      {error && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Sizes["m-2"],
            backgroundColor: "transparent",
          }}
        >
          <CircleAlert color={Colors.dark.error} />
          <Text
            id={`${field.name}-error`}
            role="alert"
            style={{
              alignItems: "center",
              fontSize: Sizes["text-sm"],
              color: Colors.dark.error,
            }}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
