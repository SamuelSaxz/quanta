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

export default function Register() {
  const router = useRouter();

  const { register } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: UsersDto.create,
    },
    onSubmit: async ({ value }) => {
      const { message } = await register({ values: value });

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
          Bem Vindo!
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

      <form.Field name="name">
        {(field) => (
          <View style={{ marginBottom: Sizes["m-6"] }}>
            <Input
              field={field}
              label="Nome Completo"
              placeholder="Nome Completo"
              value={field.state.value}
              onChangeText={(text) => field.handleChange(text)}
            />
          </View>
        )}
      </form.Field>

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
              label={isSubmitting ? "Enviando..." : "Registrar"}
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
        Já tem conta? Faça{" "}
        <Link
          href={"/(auth)/login"}
          style={{
            color: Colors["dark"]["primary"],
          }}
        >
          Login
        </Link>
      </Text>
    </View>
  );
}
