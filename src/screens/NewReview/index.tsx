import AppAvatar from "@components/AppAvatar";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { IUserServiceAd } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React from "react";

type Params = {
  service: IUserServiceAd;
};

export default function NewReview() {
  const route = useRoute();
  const { service } = route.params as Params;

  return (
    <AppScreenContainer>
      <AppSpacer />
      <AppText>Escreva uma avaliação para:</AppText>
      <AppSpacer />
      <AppText size="lg" bold>
        {service.title}
      </AppText>
      <AppAvatar size={24} imagePath={`${service.providerId?.image}`} />
    </AppScreenContainer>
  );
}
