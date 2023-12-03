import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { useTheme } from "styled-components";
import { Container, SignedInContainer, SignedOutContainer } from "./styles";

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const theme = useTheme();

  return (
    <Container>
      <SignedIn>
        <SignedInContainer>
          <AppAvatar size={34} imagePath={`${user?.imageUrl}`} />
          <AppButton
            title="Sair"
            size="sm"
            rightIcon={
              <Feather
                name="log-out"
                size={16}
                color={theme.colors.text_dark}
              />
            }
            onPress={() => signOut()}
          />
        </SignedInContainer>
      </SignedIn>
      <SignedOut>
        <SignedOutContainer>
          <AppText size="sm">Olá! Entre para acessar mais recursos!</AppText>
          <AppButton
            title="Entrar"
            size="sm"
            onPress={() => navigation.navigate("SignIn")}
          />
        </SignedOutContainer>
      </SignedOut>
    </Container>
  );
}
