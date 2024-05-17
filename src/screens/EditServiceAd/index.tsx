import AppImageSelector, { AppImagesList } from "@components/AppImageSelector";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

type Params = {
  serviceAdId: string;
};

export default function EditServiceAd() {
  const route = useRoute();
  const { serviceAdId } = route.params as Params;

  const [service, setService] = useState<IUserServiceAd>();
  const [isLoading, setIsLoading] = useState(true);

  const { getServiceAdById } = useData();

  useEffect(() => {
    async function loadServiceAd() {
      setIsLoading(true);
      try {
        const response = await getServiceAdById(serviceAdId);
        setService(response);
      } catch (error) {
        if (error instanceof AppError) return Alert.alert(error.message);
        return Alert.alert("erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    loadServiceAd();
  }, []);

  const images: AppImagesList[] =
    service && service.service_images
      ? service?.service_images?.map((img) => {
          const i: AppImagesList = {
            id: `${img.id}`,
            path: img.imagePath,
            local: false,
          };
          return i;
        })
      : [];

  return (
    <AppScreenContainer>
      <AppText>Edit service add</AppText>
      <AppText>Service ad id: {serviceAdId}</AppText>
      <AppImageSelector
        onAddImage={() => {}}
        onRemoveImage={() => {}}
        selectedImages={images}
      />
    </AppScreenContainer>
  );
}
