import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Container, Text } from "./styles";

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
    <Container>
      <Text>OAuth Sign In</Text>
    </Container>
  );
}
