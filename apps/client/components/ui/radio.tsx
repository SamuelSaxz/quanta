import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  label?: string;
}

export default function RadioButton({
  selected,
  onPress,
  label,
}: RadioButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
      }}
    >
      {/* Outer circle */}
      <View
        style={{
          width: Sizes["w-6"],
          height: Sizes["h-6"],
          borderRadius: Sizes["rounded-full"],
          borderWidth: 2,
          borderColor: selected
            ? Colors.dark.secondary
            : Colors.dark["surface-variant"],
          alignItems: "center",
          justifyContent: "center",
          marginRight: Sizes["m-2"],
        }}
      >
        {/* Inner filled circle */}
        {selected && (
          <View
            style={{
              width: Sizes["w-3"],
              height: Sizes["w-3"],
              borderRadius: Sizes["rounded-lg"],
              backgroundColor: Colors.dark.secondary,
            }}
          />
        )}
      </View>

      {label && (
        <Text
          style={{
            color: Colors.dark["on-secondary"],
            fontSize: Sizes["text-base"],
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
