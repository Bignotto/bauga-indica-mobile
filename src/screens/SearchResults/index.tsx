import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import ResultList from "./ResultList";
import { HeaderWrapper } from "./styles";

type Params = {
  searchText: string;
};

export default function SearchResults() {
  const route = useRoute();
  const { searchText } = route.params as Params;

  const { search } = useData();

  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<IUserServiceAd[]>([]);

  async function doSearch(text: string) {
    try {
      const response = await search(text);
      setServices(response);
    } catch (error) {
      console.log({ error });
      if (error instanceof AppError) return Alert.alert(error.message);

      return Alert.alert("erro desconhecido");
    }
  }

  useEffect(() => {
    doSearch(searchText);
  }, []);

  const servicesFound = services.length;

  return (
    <AppScreenContainer
      header={
        <HeaderWrapper>
          <AppLogo size="sm" />
          <AppText>Encontrados {servicesFound} serviços</AppText>
        </HeaderWrapper>
      }
    >
      <ResultList itens={services} />
    </AppScreenContainer>
  );
}
