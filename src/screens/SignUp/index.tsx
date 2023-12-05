import { useSignUp } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { FormContainer, HeaderContainer } from "./styles";

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const theme = useTheme();
  const { isLoaded, signUp, setActive } = useSignUp();

  const { isEmailAvailable } = useData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateNewAccount() {
    if (name.length === 0 || email.length === 0) return;
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const available = await isEmailAvailable(email);

      if (available) {
        const created = await signUp?.create({
          emailAddress: email.toLowerCase().trim(),
          password,
        });

        await setActive({ session: created.createdSessionId });
        navigation.navigate("CreateAccount", {
          name,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
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
            secureTextEntry={true}
          />
          <AppSpacer />
          <AppInput
            label="Confirme sua senha"
            value={confirmation}
            onChangeText={(text) => setConfirmation(text)}
            secureTextEntry={true}
          />
          <AppSpacer verticalSpace="xlg" />
          <AppButton
            title="Criar nova conta"
            variant="positive"
            onPress={handleCreateNewAccount}
            isLoading={isLoading}
          />
          <AppSpacer />
          <AppButton title="Cancelar" variant="negative" outline />
        </FormContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
