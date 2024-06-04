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
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { FormContainer, HeaderContainer } from "./styles";

export default function SignUp() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const theme = useTheme();
  const { isLoaded, signUp, setActive } = useSignUp();

  const { isEmailAvailable } = useData();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //TODO: use yup and hook-form
  async function handleCreateNewAccount() {
    if (name.length === 0) {
      Alert.alert("Nome não pode estar em branco.");
      return;
    }
    if (lastName.length === 0) {
      Alert.alert("Sobrenome não pode estar em branco.");
      return;
    }
    if (email.length === 0) {
      Alert.alert("E-Mail não pode estar em branco.");
      return;
    }

    if (password.length === 0) {
      Alert.alert("Você precisa definir uma senha.");
      return;
    }

    if (password !== confirmation) {
      Alert.alert("A confirmação de senha não bate com a senha.");
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const available = await isEmailAvailable(email);

      if (available) {
        const created = await signUp?.create({
          firstName: name,
          lastName,
          emailAddress: email.toLowerCase().trim(),
          password,
        });

        await setActive({ session: created.createdSessionId });
        navigation.navigate("CreateAccount", {
          name: `${name} ${lastName}`,
        });
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      if (error.errors[0].code === "form_identifier_exists") {
        Alert.alert(
          "Endereço de e-mail em uso. Faça login usando este e-mail."
        );
      } else if (error.errors[0].code === "form_password_length_too_short")
        Alert.alert("A senha precisa ter pelo menos 8 caracteres.");
      else if (error.errors[0].code === "form_password_pwned")
        Alert.alert("Esta senha está comprometida. Use uma mais difícil.");
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
            label="Seu primeiro nome"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <AppSpacer />
          <AppInput
            label="Seu sobrenome"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            keyboardType="default"
          />
          <AppSpacer />
          <AppInput
            label="Seu e-mail"
            value={email}
            keyboardType="email-address"
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
