import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { FontAwesome } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { HeaderContainer, LoginFormContainer } from "./styles";

export default function SignIn() {
  useWarmUpBrowser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleLogin } = useOAuth({ strategy: "oauth_apple" });

  const { signIn, isLoaded, setActive } = useSignIn();

  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        navigation.navigate("CreateAccount");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (error) {
      console.error("OAuth error", error);
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    }
  }, []);

  const handleApple = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await appleLogin();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.reset({ routes: [{ name: "Home" }] });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (error) {
      console.error("OAuth error", error);
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    }
  }, []);

  async function handleLogin() {
    if (!isLoaded) return;

    if (email.length === 0 || password.length === 0) return;

    setIsLoading(true);
    try {
      const doSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: doSignIn.createdSessionId });
      navigation.reset({ routes: [{ name: "Home" }] });
    } catch (error: any) {
      if (error.errors[0].code === "form_identifier_not_found")
        return Alert.alert("Conta não encontrada.");
      if (error.errors[0].code === "form_password_incorrect")
        return Alert.alert("E-Mail ou senha inválidos!");

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
          <AppText size="xlg">Login</AppText>
        </HeaderContainer>
      }
      headerColor={theme.colors.white}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSpacer verticalSpace="xlg" />
        <AppText>Entre com seu e-mail e senha</AppText>
        <AppSpacer />
        <LoginFormContainer>
          <AppInput
            label="E-Mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <AppSpacer verticalSpace="lg" />
          <AppInput
            label="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <AppSpacer />
          <AppButton
            title="Entrar"
            size="sm"
            outline
            onPress={handleLogin}
            isLoading={isLoading}
          />
        </LoginFormContainer>
        <AppSpacer verticalSpace="xlg" />
        <AppCenter>
          <AppText>Ou entre com:</AppText>
        </AppCenter>
        <AppSpacer />
        <AppButton
          title="Google"
          onPress={handleGoogle}
          leftIcon={
            <FontAwesome name="google" size={24} color={theme.colors.white} />
          }
        />
        <AppSpacer verticalSpace="sm" />
        <AppButton
          title="Apple"
          onPress={handleApple}
          leftIcon={
            <FontAwesome name="apple" size={24} color={theme.colors.white} />
          }
        />
        <AppSpacer verticalSpace="xlg" />
        <AppSpacer verticalSpace="xlg" />
        <AppCenter>
          <AppText>Ainda não tem uma conta?</AppText>
        </AppCenter>
        <AppSpacer />
        <AppButton
          outline
          title="Criar conta"
          onPress={() => navigation.navigate("SignUp")}
        />
      </ScrollView>
    </AppScreenContainer>
  );
}
