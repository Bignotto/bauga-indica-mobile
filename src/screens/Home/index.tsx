import { useAuth, useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { HomeContainer, Text } from "./styles";

export default function Home() {
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <HomeContainer>
      <Text>👋 Hey there! Styled components rocks!</Text>
    </HomeContainer>
  );
}
