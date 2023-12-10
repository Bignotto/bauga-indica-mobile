import { useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { IUserDTO, useData } from "@hooks/DataContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { HeaderContainer } from "./styles";

export default function Profile() {
  const theme = useTheme();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { loadUserProfile } = useData();

  const [profile, setProfile] = useState<IUserDTO>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigation.navigate("SignIn");
      return;
    }

    loadUserProfile(user!.id).then((data) => {
      setProfile(data);
      setIsLoading(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!isSignedIn) {
        navigation.navigate("SignIn");
        return;
      }
    }, [])
  );

  return (
    <AppScreenContainer
      headerColor={theme.colors.white}
      header={
        isSignedIn && (
          <HeaderContainer>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <AppCenter>
                <AppLogo size="sm" />
                <AppSpacer verticalSpace="sm" />
                <AppAvatar imagePath={`${profile!.image}`} size={180} />
                <AppSpacer verticalSpace="sm" />
                <AppText bold>Perfil público de </AppText>
                <AppText size="xlg" bold>
                  {profile?.name}
                </AppText>
              </AppCenter>
            )}
          </HeaderContainer>
        )
      }
    >
      <ScrollView>
        <AppSpacer verticalSpace="lg" />
        <AppInput label="Nome completo:" />
        <AppSpacer verticalSpace="lg" />
        <AppInput label="E-Mail:" />
        <AppSpacer verticalSpace="lg" />
        <AppInput label="Telefone:" />
        <AppSpacer verticalSpace="xlg" />
        <AppButton title="Salvar" variant="positive" />
        <AppSpacer />
        <AppButton title="Cancelar" variant="negative" />
      </ScrollView>
    </AppScreenContainer>
  );
}
