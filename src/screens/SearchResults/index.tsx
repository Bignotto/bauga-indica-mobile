import AppLogo from "@components/AppLogo";
import { useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import React, { useEffect, useState } from "react";
import { Service } from "src/@types/services/Service";
import ResultList from "./ResultList";
import { HeaderWrapper, ScreenContainer } from "./styles";

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

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <AppLogo size="sm" />
      </HeaderWrapper>
      <ResultList itens={services} />
      {
        //TODO: implement service list card
        // services.map((s) => (
        //   <View key={s.id}>
        //     <AppText bold>{s.title}</AppText>
        //     <AppText>{s.description}</AppText>
        //   </View>
        // ))
      }
    </ScreenContainer>
  );
}
