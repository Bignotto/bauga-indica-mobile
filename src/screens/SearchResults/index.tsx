import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import React, { useEffect, useState } from "react";
import { Service } from "src/@types/services/Service";
import ResultList from "./ResultList";
import { HeaderWrapper } from "./styles";

type Params = {
  searchText: string;
};

export default function SearchResults() {
  const route = useRoute();
  const { searchText } = route.params as Params;

  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function loadSearchResults() {
      try {
        const response = await api.get(`/services/search/${searchText}`);
        setServices(response.data);
      } catch (error) {
        console.log({ error });
      }
    }
    loadSearchResults();
  });

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
