// Checkbox.tsx
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import React from "react";
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type CheckboxProps = {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (newValue: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: number;
  color?: string;
  uncheckedColor?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
};

export default function Checkbox({
  value,
  defaultValue = false,
  onValueChange,
  label,
  disabled = false,
  size = Sizes["w-6"],
  color = Colors.dark.secondary,
  uncheckedColor = Colors.dark["surface-variant"],
  style,
  labelStyle,
  testID,
}: CheckboxProps) {
  const [internal, setInternal] = React.useState<boolean>(defaultValue);

  const isControlled = typeof value === "boolean";
  const checked = isControlled ? (value as boolean) : internal;

  const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [checked, anim]);

  function toggle() {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  const checkScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });
  const checkOpacity = anim;

  const containerStyles: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  };

  const boxStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: Sizes["rounded-sm"],
    borderWidth: 1,
    borderColor: checked ? color : uncheckedColor,
    backgroundColor: checked ? color : "transparent",
    alignItems: "center",
    justifyContent: "center",
  };

  const accessibilityState = { disabled, checked };

  return (
    <Pressable
      onPress={toggle}
      style={[containerStyles, style]}
      accessibilityRole="checkbox"
      accessibilityState={accessibilityState}
      accessibilityLabel={label}
      disabled={disabled}
      testID={testID}
    >
      <View style={boxStyle}>
        <Animated.View
          style={{
            transform: [{ scale: checkScale }],
            opacity: checkOpacity,
          }}
        ></Animated.View>
      </View>

      {label ? (
        <Text
          style={[
            {
              color: disabled
                ? Colors.dark.placeholder
                : Colors.dark["on-surface"],
              fontSize: Sizes["text-base"],
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
