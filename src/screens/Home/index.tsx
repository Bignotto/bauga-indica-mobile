import { useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { HomeContainer, SearchInputWrapper } from "./styles";

export default function Home() {
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <HomeContainer>
      <AppLogo size="lg" />
      <SearchInputWrapper>
        <AppInput label="Procure" placeholder="O que você procura?" />
        <AppButton />
      </SearchInputWrapper>
    </HomeContainer>
  );
}
