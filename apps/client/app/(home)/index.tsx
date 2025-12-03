import { Text, View } from "@client/components/Themed";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "40%",
          backgroundColor: Colors["dark"]["surface"],
          borderTopLeftRadius: Sizes["rounded-8xl"],
          borderTopRightRadius: Sizes["rounded-8xl"],
          paddingHorizontal: Sizes["p-3"],
          paddingVertical: Sizes["p-10"],
        }}
      >
        <Text>Quanta</Text>

        <Text
          style={{
            fontSize: Sizes["text-4xl"],
            fontWeight: "medium",
            textAlign: "center",
            letterSpacing: 1.6,
          }}
        >
          Seu hábito começa na menor unidade de energia: o{" "}
          <Text style={{ color: Colors["dark"]["text-secondary"] }}>
            Quanta
          </Text>
          .
        </Text>

        <Pressable
          style={{
            width: "100%",
            paddingHorizontal: Sizes["p-3"],
            paddingVertical: Sizes["p-2"],
            backgroundColor: Colors["dark"]["primary"],
            borderRadius: Sizes["rounded-md"],
          }}
          onPress={() => {
            router.navigate("/(home)/motivation");
          }}
        >
          <Text
            style={{
              color: Colors["dark"]["on-primary"],
              textAlign: "center",
            }}
          >
            Começar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
