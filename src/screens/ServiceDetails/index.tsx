import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";

type Params = {
  serviceId: string;
};

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId } = route.params as Params;

  const { getServiceAdById } = useData();

  const [isLoading, setIsLoading] = useState(true);

  const [service, setService] = useState<IUserServiceAd>();

  useEffect(() => {
    async function loadService() {
      const response = await getServiceAdById(serviceId);
      setService(response);
    }
    loadService();
  }, []);

  return (
    <AppScreenContainer>
      <AppText>This is service ad details!</AppText>
      {service?.service_images &&
        service.service_images.map((img) => (
          <Image
            key={img.id}
            source={{
              uri: img.imagePath,
            }}
            style={{
              width: 120,
              height: 80,
            }}
          />
        ))}
    </AppScreenContainer>
  );
}
