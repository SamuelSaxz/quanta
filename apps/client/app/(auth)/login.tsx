import { Text, View } from "@client/components/Themed";
import Button from "@client/components/ui/button";
import Input from "@client/components/ui/input";
import Colors from "@client/constants/Colors";
import Sizes from "@client/constants/Sizes";
import { useAuth } from "@client/context/auth-provider";
import { UsersDto } from "@shared/dto";
import { useForm } from "@tanstack/react-form";
import { Link, useRouter } from "expo-router";
import { toast } from "sonner-native";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: UsersDto.login,
    },
    onSubmit: async ({ value }) => {
      const { message } = await login({ values: value });

      toast.success(message);

      router.navigate("/(onboarding)");
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.dark.surface }}>
      <View
        style={{
          marginBottom: Sizes["m-6"],
          backgroundColor: Colors.dark.surface,
        }}
      >
        <Text
          style={{
            fontSize: Sizes["text-2xl"],
            fontWeight: "medium",
            color: Colors["dark"]["on-surface"],
          }}
        >
          Bem Vindo de Volta!
        </Text>

        <Text
          style={{
            fontSize: Sizes["text-base"],
            color: Colors["dark"]["text-secondary"],
          }}
        >
          Preencha os dados e ganhe acesso ao sistema.
        </Text>
      </View>

      <form.Field name="email">
        {(field) => (
          <View style={{ marginBottom: Sizes["m-6"] }}>
            <Input
              field={field}
              label="Email"
              placeholder="email@example.com"
              value={field.state.value}
              onChangeText={(text) => field.handleChange(text)}
            />
          </View>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <View style={{ marginBottom: Sizes["m-6"] }}>
            <Input
              field={field}
              label="Senha"
              secureTextEntry
              placeholder="********"
              value={field.state.value}
              onChangeText={(text) => field.handleChange(text)}
            />
          </View>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: Sizes["m-6"],
              backgroundColor: Colors.dark.surface,
            }}
          >
            <Button
              label={isSubmitting ? "Enviando..." : "Entrar"}
              disabled={!canSubmit}
              onPress={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
              }}
            />
          </View>
        )}
      />

      <Text style={{ textAlign: "center", fontSize: Sizes["text-base"] }}>
        Não tem conta?{" "}
        <Link
          href={"/(auth)/register"}
          style={{
            color: Colors["dark"]["primary"],
          }}
        >
          Registre-se
        </Link>
      </Text>
    </View>
  );
}
