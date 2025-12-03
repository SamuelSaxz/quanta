import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { Pressable, Text, type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <Pressable
      style={{
        flex: 1,
        paddingHorizontal: Sizes["p-3"],
        paddingVertical: Sizes["p-2"],
        backgroundColor: Colors["dark"]["primary"],
        borderRadius: Sizes["rounded-md"],
      }}
      {...props}
    >
      <Text
        style={{
          color: Colors["dark"]["on-primary"],
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
