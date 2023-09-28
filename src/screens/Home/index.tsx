import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { appUseAuth } from "@hooks/AppAuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { useState } from "react";
import { HomeContainer, SearchInputWrapper } from "./styles";

export default function Home() {
  const { session, appSignOut } = appUseAuth();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [searchText, setSearchText] = useState("");

  async function handleSearch() {
    //TODO: Log search

    if (searchText.length === 0) return null;
    navigation.navigate("Search", { searchText });
  }

  return (
    <AppScreenContainer>
      <SignedIn>
        <AppText>Olá {session?.name}</AppText>
        <AppButton title="Logout" onPress={() => appSignOut()} />
      </SignedIn>
      <SignedOut>
        <AppText>
          Faça login para mais recursos. Crie sua conta ou entre com o Google!
        </AppText>
        <AppButton
          title="Entrar!"
          onPress={() => navigation.navigate("OAuth")}
        />
      </SignedOut>
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
