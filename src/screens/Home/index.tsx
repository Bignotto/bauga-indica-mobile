import { useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { useState } from "react";
import { useTheme } from "styled-components";
import { HomeContainer, SearchInputWrapper } from "./styles";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [searchText, setSearchText] = useState("");
  const { isSignedIn } = useUser();
  const { signOut } = useAuth();

  const theme = useTheme();

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
            placeholder="O que você procura?"
            value={searchText}
            onChangeText={setSearchText}
          />
          <AppButton
            title="Procurar"
            variant={"solid"}
            onPress={handleSearch}
          />
          <AppButton title="Logout" onPress={() => signOut()} />
        </SearchInputWrapper>
      </HomeContainer>
    </AppScreenContainer>
  );
}
