import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { Feather } from "@expo/vector-icons";
import { IUserDTO, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Container, SignedInContainer, SignedOutContainer } from "./styles";

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const theme = useTheme();

  const { loadUserProfile } = useData();
  const [profile, setProfile] = useState<IUserDTO>();

  useEffect(() => {
    async function load() {
      try {
        const response = await loadUserProfile(`${user!.id}`);
        setProfile(response);

        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);

  return (
    <Container>
      <SignedIn>
        <SignedInContainer>
          <AppAvatar size={34} imagePath={`${profile?.image}`} />
          <AppText>{profile?.name}</AppText>
          <AppButton
            title="Sair"
            size="sm"
            rightIcon={
              <Feather name="log-out" size={16} color={theme.colors.white} />
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
