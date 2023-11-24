import AppScreenContainer from "@components/AppScreenContainer";
import { useRoute } from "@react-navigation/native";
import AppService from "@screens/SearchResults/ResultList/AppService";
import { api } from "@services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Service } from "src/@types/services/Service";

type Params = {
  serviceId: string;
};

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId } = route.params as Params;

  const [isLoading, setIsLoading] = useState(true);

  const [service, setService] = useState<Service>();

  useEffect(() => {
    async function loadService() {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    loadService();
  }, []);

  return (
    <AppScreenContainer>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <AppService item={service!} buttonType="contact" showButton />
      )}
    </AppScreenContainer>
  );
}
