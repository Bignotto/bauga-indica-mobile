import { useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components";
import { HeaderContainer } from "./styles";

interface CreateAccountParams {
  name: string;
}

export default function CreateAccount() {
  const route = useRoute();
  const { name } = route.params as CreateAccountParams;

  const { createNewAccount, loadUserProfile } = useData();
  const { user, isLoaded, isSignedIn } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  async function saveAccount() {
    try {
      const response = await createNewAccount({
        id: user?.id,
        name,
        email: `${user?.primaryEmailAddress?.emailAddress}`,
        image: `${user?.imageUrl}`,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function loadProfile() {
    if (!isLoaded) return;
    if (!user) return;
    setIsLoading(true);

    try {
      const loadedProfile = await loadUserProfile(`${user?.id}`);

      if (!loadedProfile) {
        const newProfile = {
          id: `${user?.id}`,
          name: name ? name : `${user?.fullName}`,
          email: `${user?.primaryEmailAddress?.emailAddress}`,
          image: `${user?.imageUrl}`,
        };
        await createNewAccount(newProfile);
        setIsLoading(false);
        return;
      }

      navigation.reset({ routes: [{ name: "Home" }] });
    } catch (error) {
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
    <AppScreenContainer
      header={
        <HeaderContainer>
          <AppCenter>
            <AppLogo size="sm" />
          </AppCenter>
          <AppSpacer verticalSpace="xlg" />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <AppText size="xlg">
              {name ? name : `${user?.fullName}`} sua conta foi criada!
            </AppText>
          )}
          <AppSpacer verticalSpace="xlg" />
        </HeaderContainer>
      }
      headerColor={theme.colors.white}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AppSpacer verticalSpace="xlg" />
          <AppText>
            Sua conta foi criada. Complete seu perfil para ter acesso a todos os
            recursos do Bauga Indica.
          </AppText>
          <AppButton
            title="OK"
            onPress={() => navigation.reset({ routes: [{ name: "Home" }] })}
          />
        </>
      )}
    </AppScreenContainer>
  );
}
