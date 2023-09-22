import AppLogo from "@components/AppLogo";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Service } from "src/@types/services/Service";
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
      {services.map((s) => (
        <View key={s.id}>
          <AppText bold>{s.title}</AppText>
          <AppText>{s.description}</AppText>
        </View>
      ))}
    </ScreenContainer>
  );
}
