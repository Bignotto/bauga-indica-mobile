import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import ServiceAdCard from "@components/ServiceAdCard";
import { AppError } from "@errors/AppError";
import { Entypo } from "@expo/vector-icons";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

export default function UserServiceAds() {
  const { getUserServiceAds } = useData();
  const theme = useTheme();

  const [adsList, setAdsList] = useState<IUserServiceAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadAdsList() {
    setIsLoading(true);

    try {
      const response = await getUserServiceAds();
      if (response) setAdsList(response);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadAdsList();
  });

  return (
    <AppScreenContainer>
      <AppText>Seus anúncios cadastrados</AppText>
      <AppButton
        title="Novo anúncio"
        leftIcon={<Entypo name="plus" size={24} color={theme.colors.white} />}
      />
      <ScrollView>
        {adsList.map((ad) => (
          <ServiceAdCard
            item={ad}
            showDescription={false}
            showProvider={false}
            key={ad.id}
          />
        ))}
      </ScrollView>
    </AppScreenContainer>
  );
}
