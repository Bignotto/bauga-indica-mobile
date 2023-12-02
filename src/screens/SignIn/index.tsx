import { useOAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { FontAwesome } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useTheme } from "styled-components";
import { HeaderContainer, LoginFormContainer } from "./styles";

export default function SignIn() {
  useWarmUpBrowser();

  const navigation = useNavigation();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const theme = useTheme();

  const handleGoogle = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.goBack();
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
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
      <AppButton outline title="Criar conta" />
    </AppScreenContainer>
  );
}
