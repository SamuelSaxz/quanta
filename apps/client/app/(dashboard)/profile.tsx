import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useAuth } from "@client/context/auth-provider";
import { Atom, Flame } from "lucide-react-native";
import { Pressable } from "react-native";

export default function DashboardProfile() {
  const { user, logout } = useAuth();

  const date = new Date(user?.createdAt ?? new Date());

  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const month = monthNames[date.getUTCMonth()];

  return (
    <View style={{ flex: 1, gap: 16, backgroundColor: Colors.dark.background }}>
      <Text style={{ fontSize: Sizes["text-xl"] }}>{user?.name}</Text>
      <Text>{`Conta Criada em ${day} de ${month} de ${year}`}</Text>

      <View
        style={{
          paddingVertical: 16,
          borderTopColor: Colors.dark["surface-elevated"],
          borderBottomColor: Colors.dark["surface-elevated"],
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Atom color={Colors.dark["on-primary"]} />
            <Text>Quantidade de Hábitos</Text>
          </View>

          <Text>3</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Flame color={Colors.dark["on-primary"]} />
            <Text>Dias consecutivos</Text>
          </View>

          <Text>3</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Button label="Remover Conta" onPress={() => logout()} />

        <Pressable
          style={{
            flex: 1,
            paddingHorizontal: Sizes["p-3"],
            paddingVertical: Sizes["p-2"],
            backgroundColor: Colors["dark"]["error"],
            borderRadius: Sizes["rounded-md"],
          }}
        >
          <Text
            style={{
              color: Colors["dark"]["on-primary"],
              textAlign: "center",
            }}
          >
            Deletar Conta
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
