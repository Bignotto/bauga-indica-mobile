import AppScreenContainer from "@components/AppScreenContainer";
import { AppError } from "@errors/AppError";
import { AntDesign } from "@expo/vector-icons";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, View } from "react-native";
import { useTheme } from "styled-components";
import ResultList from "./ResultList";
import { InputComponent, InputWrapper, SearchInputWrapper } from "./styles";

type Params = {
  searchText: string;
};

export default function SearchResults() {
  const route = useRoute();
  const { searchText } = route.params as Params;

  const theme = useTheme();

  const { search } = useData();

  const [searchedText, setSearchedText] = useState(searchText);
  const [services, setServices] = useState<IUserServiceAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function doSearch(text: string) {
    setIsLoading(true);

    try {
      const response = await search(text);
      setServices(response);
    } catch (error) {
      console.log({ error });
      if (error instanceof AppError) return Alert.alert(error.message);

      return Alert.alert("erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    doSearch(searchText);
  }, []);

  const servicesFound = services.length;

  return (
    <AppScreenContainer
      header={
        <View
          style={{
            padding: 16,
          }}
        >
          <SearchInputWrapper>
            <InputWrapper>
              <InputComponent
                value={searchedText}
                onChangeText={(t) => setSearchedText(t)}
              />
            </InputWrapper>
            <Pressable onPress={() => doSearch(searchedText)}>
              {isLoading ? (
                <ActivityIndicator color={theme.colors.border} />
              ) : (
                <AntDesign name="search1" size={24} color={theme.colors.text} />
              )}
            </Pressable>
          </SearchInputWrapper>
        </View>
      }
    >
      <ResultList itens={services} searchText={searchedText} />
    </AppScreenContainer>
  );
}
