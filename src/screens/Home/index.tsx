import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Box, Button, Divider, Heading, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";

export default function Home() {
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <Box
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="$trueGray300"
    >
      <Heading>This is template version 0</Heading>
      <Text>User id is {`${user?.primaryEmailAddress}`}</Text>
      <Text>User id is {`${sessionId}`}</Text>

      <Divider bg="$white" my="$1.5" width="80%" />
      <SignedOut>
        <Button onPress={() => navigation.navigate("Google")} bgColor="$white">
          <Text color="$trueGray700" fontWeight="$bold">
            OAuth Login
          </Text>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button onPress={() => signOut()} bgColor="$white">
          <Text color="$trueGray700" fontWeight="$bold">
            LOG OUT
          </Text>
        </Button>
      </SignedIn>
    </Box>
  );
}
