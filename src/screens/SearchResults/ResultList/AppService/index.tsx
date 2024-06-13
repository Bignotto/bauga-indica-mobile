import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useState } from "react";
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
  searchText?: string;
  buttonType?: "details" | "contact";
  showButton?: boolean;
};

export default function AppService({
  item,
  searchText,
  buttonType = "details",
  showButton = true,
}: AppServiceProps) {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { activityLog } = useData();

  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckServiceDetails(serviceId: string) {
    setIsLoading(true);
    await activityLog({
      event: "click",
      subject: item.id!,
      user_provider: item.providerId?.id,
      data: searchText,
    });

    navigation.navigate("ServiceDetails", {
      serviceId,
      searchTerm: searchText,
    });
    setIsLoading(false);
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
            onPress={() => handleCheckServiceDetails(item.id!)}
            isLoading={isLoading}
          />
        )}
        {showButton && buttonType === "contact" && (
          <AppButton
            title="Entrar em contato!"
            isLoading={isLoading}
            onPress={() => handleCheckServiceDetails(item.id!)}
          />
        )}
      </ContentWrapper>
    </ResultItem>
  );
}
