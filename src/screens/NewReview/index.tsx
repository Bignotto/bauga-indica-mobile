import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { FontAwesome } from "@expo/vector-icons";
import { IUserServiceAd } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import { ProviderInfoContainer, StarsContainer } from "./styles";

type Params = {
  service: IUserServiceAd;
};

export default function NewReview() {
  const route = useRoute();
  const { service } = route.params as Params;

  const [rate, setRate] = useState(0);

  function handleClickRate(value: number) {
    value === rate ? setRate(0) : setRate(value);
  }

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
        <RectButton onPress={() => handleClickRate(1)}>
          {rate >= 1 ? (
            <FontAwesome name="star" size={54} color="gold" />
          ) : (
            <FontAwesome name="star-o" size={54} color="gold" />
          )}
        </RectButton>
        <RectButton onPress={() => handleClickRate(2)}>
          {rate >= 2 ? (
            <FontAwesome name="star" size={54} color="gold" />
          ) : (
            <FontAwesome name="star-o" size={54} color="gold" />
          )}
        </RectButton>
        <RectButton onPress={() => handleClickRate(3)}>
          {rate >= 3 ? (
            <FontAwesome name="star" size={54} color="gold" />
          ) : (
            <FontAwesome name="star-o" size={54} color="gold" />
          )}
        </RectButton>
        <RectButton onPress={() => handleClickRate(4)}>
          {rate >= 4 ? (
            <FontAwesome name="star" size={54} color="gold" />
          ) : (
            <FontAwesome name="star-o" size={54} color="gold" />
          )}
        </RectButton>
        <RectButton onPress={() => handleClickRate(5)}>
          {rate >= 5 ? (
            <FontAwesome name="star" size={54} color="gold" />
          ) : (
            <FontAwesome name="star-o" size={54} color="gold" />
          )}
        </RectButton>
      </StarsContainer>
      <AppSpacer />
      <AppInput label="Título:" />
      <AppInput
        label="Avaliação:"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      <AppButton title="Enviar avaliação" variant="positive" />
      <AppSpacer />
      <AppButton title="Cancelar" variant="negative" outline />
    </AppScreenContainer>
  );
}
