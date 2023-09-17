import { useOAuth } from "@clerk/clerk-expo";
import { Box, Button, Text } from "@gluestack-ui/themed";
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
    <Box
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="$trueGray300"
    >
      <Button onPress={handleGoogle}>
        <Text color="$white" fontWeight="$bold">
          Log in with google
        </Text>
      </Button>
    </Box>
  );
}
