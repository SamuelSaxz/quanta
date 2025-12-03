import { Text, View } from "@client/components/Themed";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Motivation() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);

  const pages = [
    {
      title: "Comece pequeno, vença consistentemente",
      description:
        "Sugerimos micro-ações (Quanta) que você realmente fará todos os dias.",
    },
    {
      title: "Personalizado pelo método BJ Fogg",
      description:
        "Medimos Motivação, Habilidade e o melhor Gatilho para criar hábitos que funcionam.",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const current = Math.round(e.nativeEvent.contentOffset.x / width);
          setPage(current);
        }}
        scrollEventThrottle={16}
      >
        {pages.map((item, index) => (
          <View
            key={index}
            style={{
              width,
              padding: Sizes["p-6"],
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: Sizes["text-4xl"],
                fontWeight: "bold",
                letterSpacing: 1.6,
                marginBottom: Sizes["m-4"],
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                fontSize: Sizes["text-base"],
                textAlign: "center",
                letterSpacing: 0.8,
              }}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* DOTS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: Sizes["m-6"],
        }}
      >
        {pages.map((_, index) => (
          <View
            key={index}
            style={{
              width: Sizes["w-6"],
              height: Sizes["w-6"],
              borderRadius: Sizes["rounded-full"],
              marginHorizontal: Sizes["m-3"],
              backgroundColor:
                page === index
                  ? Colors.dark.primary
                  : Colors.dark["surface-elevated"],
            }}
          />
        ))}
      </View>

      {page === pages.length - 1 && (
        <View
          style={{
            paddingHorizontal: Sizes["p-6"],
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: Sizes["m-8"],
          }}
        >
          <Pressable
            style={{
              flex: 1,
              marginRight: Sizes["m-3"],
              paddingHorizontal: Sizes["p-3"],
              paddingVertical: Sizes["p-2"],
              backgroundColor: Colors["dark"]["secondary"],
              borderRadius: Sizes["rounded-md"],
            }}
            onPress={() => {
              router.navigate("/(auth)/register");
            }}
          >
            <Text
              style={{
                color: Colors["dark"]["on-primary"],
                textAlign: "center",
              }}
            >
              Registrar
            </Text>
          </Pressable>

          <Pressable
            style={{
              flex: 1,
              paddingHorizontal: Sizes["p-3"],
              paddingVertical: Sizes["p-2"],
              backgroundColor: Colors["dark"]["primary"],
              borderRadius: Sizes["rounded-md"],
            }}
            onPress={() => {
              router.navigate("/(auth)/login");
            }}
          >
            <Text
              style={{
                color: Colors["dark"]["on-primary"],
                textAlign: "center",
              }}
            >
              Entrar
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
