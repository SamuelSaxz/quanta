import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import type { LucideProps } from "lucide-react-native";
import { Pressable, type PressableProps } from "react-native";

interface ButtonNavigationProps extends PressableProps {
  icon: React.ElementType<LucideProps>;
  selected: boolean;
}

export default function ButtonNavigation({
  icon: Icon,
  selected,
  ...props
}: ButtonNavigationProps) {
  return (
    <Pressable
      style={{
        // flex: 1,
        width: Sizes["w-12"],
        height: Sizes["w-12"],
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Sizes["rounded-full"],
        backgroundColor: selected
          ? Colors.dark["primary"]
          : Colors.dark["surface-elevated"],
      }}
      {...props}
    >
      <Icon color={Colors.dark["on-surface-elevated"]} />
    </Pressable>
  );
}
