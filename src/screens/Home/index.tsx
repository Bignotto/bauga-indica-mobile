import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import Header from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { useState } from "react";
import { useTheme } from "styled-components";
import { HomeContainer, SearchInputWrapper } from "./styles";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [searchText, setSearchText] = useState("");

  const theme = useTheme();

  async function handleSearch() {
    //TODO: Log search

    if (searchText.length === 0) return null;
    navigation.navigate("Search", { searchText });
  }

  return (
    <AppScreenContainer
      header={<Header />}
      headerColor={theme.colors.primary_dark}
    >
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
        </SearchInputWrapper>
      </HomeContainer>
    </AppScreenContainer>
  );
}
