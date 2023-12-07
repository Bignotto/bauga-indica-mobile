import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { Feather } from "@expo/vector-icons";
import { IUserDTO, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components";
import { Container, SignedInContainer, SignedOutContainer } from "./styles";

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isLoaded, user, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const theme = useTheme();

  const { loadUserProfile, createNewAccount } = useData();

  const [profile, setProfile] = useState<IUserDTO>();
  const [isLoading, setIsLoading] = useState(true);

  async function loadProfile() {
    setIsLoading(true);

    try {
      const loadedProfile = await loadUserProfile(`${user?.id}`);

      if (!loadedProfile) {
        const newProfile = {
          id: `${user?.id}`,
          name: `${user?.fullName}`,
          email: `${user?.primaryEmailAddress?.emailAddress}`,
          image: `${user?.imageUrl}`,
        };
        await createNewAccount(newProfile);
        setProfile(newProfile);
        setIsLoading(false);
        return;
      }

      setProfile(loadedProfile);
    } catch (error) {
      console.log({ message: "aqui", error });
      //esta merda está dando erro em algum lugar aqui!
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isSignedIn && user) {
      loadProfile();
    }
  }, [isSignedIn, user]);

  return (
    <Container>
      <SignedIn>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <SignedInContainer>
              <AppAvatar size={34} imagePath={`${profile?.image}`} />
              <AppText>{profile?.name}</AppText>
              <AppButton
                title="Sair"
                size="sm"
                rightIcon={
                  <Feather
                    name="log-out"
                    size={16}
                    color={theme.colors.white}
                  />
                }
                onPress={() => signOut()}
              />
            </SignedInContainer>
          </>
        )}
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
