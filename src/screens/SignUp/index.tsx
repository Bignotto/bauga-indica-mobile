import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { FormContainer, HeaderContainer } from "./styles";

export default function SignUp() {
  const theme = useTheme();
  return (
    <AppScreenContainer
      header={
        <HeaderContainer>
          <AppCenter>
            <AppLogo size="sm" />
          </AppCenter>
          <AppSpacer verticalSpace="xlg" />
          <AppText size="xlg">Criar nova conta</AppText>
          <AppSpacer verticalSpace="xlg" />
          <AppText>
            Preencha as informações abaixo para criar uma nova conta usando seu
            e-mail.
          </AppText>
        </HeaderContainer>
      }
      headerColor={theme.colors.white}
    >
      <ScrollView>
        <AppSpacer verticalSpace="xlg" />
        <FormContainer>
          <AppInput label="Seu nome" />
          <AppSpacer />
          <AppInput label="Seu e-mail" />
          <AppSpacer verticalSpace="xlg" />
          <AppText>Defina uma senha segura para sua conta</AppText>
          <AppSpacer verticalSpace="sm" />
          <AppInput label="Senha" />
          <AppSpacer />
          <AppInput label="Confirme sua senha" />
          <AppSpacer verticalSpace="xlg" />
          <AppButton title="Criar nova conta" variant="positive" />
          <AppSpacer />
          <AppButton title="Cancelar" variant="negative" outline />
        </FormContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
