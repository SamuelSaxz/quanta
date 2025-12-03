import { Text, View } from "@client/components/Themed";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useStep } from "@client/context/step-provider";
import React from "react";

interface StepsProps {
  length?: number;
}

export default function Steps({ length = 6 }: StepsProps) {
  const { step, setMaxLength } = useStep();

  React.useEffect(() => {
    setMaxLength(length);
  }, [length]);

  return (
    <View
      style={{
        alignItems: "center",
        paddingHorizontal: Sizes["p-3"],
        paddingVertical: Sizes["p-10"],
        backgroundColor: Colors.dark.surface,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: Sizes["m-3"],
        }}
      >
        {Array.from({ length }).map((_, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              height: 3,
              backgroundColor:
                index + 1 <= step ? Colors.dark.accent : Colors.dark.secondary,
              marginRight: index !== length - 1 ? Sizes["m-3"] : 0,
            }}
          />
        ))}
      </View>

      <Text>
        {step} de {length}
      </Text>
    </View>
  );
}
