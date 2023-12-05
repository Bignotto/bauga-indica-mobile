import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { useTheme } from "styled-components";
import { HeaderContainer } from "./styles";

export default function CreateAccount() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const theme = useTheme();

  return (
    <AppScreenContainer
      header={
        <HeaderContainer>
          <AppCenter>
            <AppLogo size="sm" />
          </AppCenter>
          <AppSpacer verticalSpace="xlg" />
          <AppText size="xlg">Sua conta foi criada!</AppText>
          <AppSpacer verticalSpace="xlg" />
        </HeaderContainer>
      }
      headerColor={theme.colors.white}
    >
      <AppSpacer verticalSpace="xlg" />
      <AppText>
        Sua conta foi criada. Complete seu perfil para ter acesso a todos os
        recursos do Bauga Indica.
      </AppText>
      <AppButton
        title="OK"
        onPress={() => navigation.reset({ routes: [{ name: "Home" }] })}
      />
    </AppScreenContainer>
  );
}
