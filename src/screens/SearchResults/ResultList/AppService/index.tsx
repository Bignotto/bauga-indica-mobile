import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { IUserServiceAd } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { useTheme } from "styled-components";
import {
  ContentWrapper,
  ProviderAvatar,
  ProviderInfoWrapper,
  ProviderName,
  ProviderPriceWrapper,
  ResultItem,
  Tag,
  TagText,
  TagWrapper,
  TitleWrapper,
} from "./styles";

type AppServiceProps = {
  item: IUserServiceAd;
  buttonType?: "details" | "contact";
  showButton?: boolean;
};

export default function AppService({
  item,
  buttonType = "details",
  showButton = true,
}: AppServiceProps) {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function handleServiceDetails(serviceId: string) {
    navigation.navigate("ServiceDetails", { serviceId });
  }

  async function handleContactProvider(serviceId: string) {
    //TODO: reimplement
    navigation.navigate("ServiceDetails", { serviceId });
  }
  return (
    <ResultItem>
      <TitleWrapper>
        <AppText bold size="lg">
          {item.title}
        </AppText>
      </TitleWrapper>
      <ContentWrapper>
        <AppText>{item.description}</AppText>
        <TagWrapper>
          <Tag>
            <TagText>{item.serviceTypeId!.name}</TagText>
          </Tag>
        </TagWrapper>

        <ProviderPriceWrapper>
          <ProviderInfoWrapper>
            <ProviderAvatar
              source={{
                uri: item.providerId!.image,
              }}
            />
            <ProviderName>
              <AppText bold>{item.providerId!.name}</AppText>
            </ProviderName>
          </ProviderInfoWrapper>
          <AppText bold size="lg" color={theme.colors.primary_dark}>
            {`R$ ${item.value.toFixed(2)}`}
          </AppText>
        </ProviderPriceWrapper>
        {showButton && buttonType === "details" && (
          <AppButton
            title="Ver mais detalhes"
            onPress={() => handleServiceDetails(item.id!)}
          />
        )}
        {showButton && buttonType === "contact" && (
          <AppButton
            title="Entrar em contato!"
            onPress={() => handleContactProvider(item.id!)}
          />
        )}
      </ContentWrapper>
    </ResultItem>
  );
}
