import { useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { useState } from "react";
import { HomeContainer, SearchInputWrapper } from "./styles";

export default function Home() {
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [searchText, setSearchText] = useState("");

  async function handleSearch() {
    //TODO: Log search

    if (searchText.length === 0) return null;
    navigation.navigate("Search", { searchText });
  }

  return (
    <AppScreenContainer>
      <HomeContainer>
        <AppLogo size="lg" />
        <SearchInputWrapper>
          <AppInput
            label="Procure"
            placeholder="O que você procura?"
            value={searchText}
            onChangeText={setSearchText}
          />
          <AppButton
            title="Procurar"
            variant={"solid"}
            onPress={handleSearch}
          />
        </SearchInputWrapper>
      </HomeContainer>
    </AppScreenContainer>
  );
}
