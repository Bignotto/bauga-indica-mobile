import { useOAuth } from "@clerk/clerk-expo";
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
import { useCallback } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { HeaderContainer, LoginFormContainer } from "./styles";

export default function SignIn() {
  useWarmUpBrowser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const theme = useTheme();

  const handleGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.reset({ routes: [{ name: "Home" }] });
      } else {
        // Use signIn or signUp for next steps such as MFA
        console.log({ createdSessionId });
      }
    } catch (error) {
      console.error("OAuth error", error);
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    }
  }, []);

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
          <AppInput label="E-Mail" />
          <AppSpacer verticalSpace="lg" />
          <AppInput label="Senha" />
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
