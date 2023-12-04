import { useSignUp } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { useData } from "@hooks/DataContext";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { FormContainer, HeaderContainer } from "./styles";

export default function SignUp() {
  const theme = useTheme();
  const { isLoaded, signUp, setActive } = useSignUp();

  const { isEmailAvailable } = useData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  async function handleCreateNewAccount() {
    if (name.length == 0 || email.length == 0) return;
    if (!isLoaded) {
      return;
    }

    try {
      const available = await isEmailAvailable(email);

      if (available) {
        const created = await signUp?.create({
          emailAddress: email,
          password,
        });

        console.log(JSON.stringify(created, null, 2));
        await setActive({ session: created.createdSessionId });
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      console.log({ error });
    }
  }

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
          <AppInput
            label="Seu nome"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <AppSpacer />
          <AppInput
            label="Seu e-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <AppSpacer verticalSpace="xlg" />
          <AppText>Defina uma senha segura para sua conta</AppText>
          <AppSpacer verticalSpace="sm" />
          <AppInput
            label="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <AppSpacer />
          <AppInput
            label="Confirme sua senha"
            value={confirmation}
            onChangeText={(text) => setConfirmation(text)}
          />
          <AppSpacer verticalSpace="xlg" />
          <AppButton
            title="Criar nova conta"
            variant="positive"
            onPress={handleCreateNewAccount}
          />
          <AppSpacer />
          <AppButton title="Cancelar" variant="negative" outline />
        </FormContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
