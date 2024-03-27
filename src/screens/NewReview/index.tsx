import AppAvatar from "@components/AppAvatar";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { FontAwesome } from "@expo/vector-icons";
import { IUserServiceAd } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { ProviderInfoContainer, StarsContainer } from "./styles";

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
      <ProviderInfoContainer>
        <AppAvatar size={24} imagePath={`${service.providerId?.image}`} />
        <AppText>{service.providerId?.name}</AppText>
      </ProviderInfoContainer>

      <AppSpacer verticalSpace="xlg" />
      <AppText>Nota:</AppText>
      <StarsContainer>
        <FontAwesome name="star" size={54} color="gold" />
        <FontAwesome name="star-o" size={54} color="gold" />
      </StarsContainer>
    </AppScreenContainer>
  );
}
