import { useAuth, useUser } from "@clerk/clerk-expo";
import AppLogo from "@components/AppLogo";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { HomeContainer } from "./styles";

export default function Home() {
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <HomeContainer>
      <AppLogo />
    </HomeContainer>
  );
}
