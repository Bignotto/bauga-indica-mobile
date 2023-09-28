import { useOAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default function OAuthSignIn() {
  useWarmUpBrowser();

  const navigation = useNavigation();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

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
    <AppScreenContainer>
      <AppButton title="Login com Google" onPress={handleGoogle} />
    </AppScreenContainer>
  );
}
