import AppButton from "@components/AppButton";
import AppSpacer from "@components/AppSpacer";
import AppStarsScore from "@components/AppStarsScore";
import AppText from "@components/AppText";
import { useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { Linking } from "react-native";
import { useTheme } from "styled-components";
import {
  ContentWrapper,
  OwnerButtonsWrapper,
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

interface ServiceAdCardProps {
  service: {
    id?: string;
    title?: string;
    description?: string;
    value: number;
    provider?: {
      id?: string;
      name?: string;
      image?: string;
      phone: string;
    };
    rating?: number;
    serviceType?: {
      id?: number;
      name?: string;
    };
    review?: {
      count: number;
      score_total: number;
    };
  };
  buttonType?: "details" | "contact";
  showButton?: boolean;
  showDescription?: boolean;
  showProvider?: boolean;
  showReviewScore?: boolean;
  searchText?: string;
}

export default function ServiceAdCard({
  service,
  buttonType = "details",
  showButton = true,
  showDescription = true,
  showProvider = true,
  showReviewScore = false,
  searchText,
}: ServiceAdCardProps) {
  const { userProfile, activityLog } = useData();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function handleServiceDetails(serviceId: string) {
    await activityLog({
      event: "click",
      subject: `${service.id}`,
      data: searchText,
      user_id: userProfile ? userProfile.id : "guest",
      user_provider: service.provider?.id,
    });
    navigation.navigate("ServiceDetails", {
      serviceId,
      searchTerm: searchText,
    });
  }

  async function handleContactProvider() {
    await activityLog({
      event: "contact",
      subject: `${service.id}`,
      data: searchText,
      user_id: userProfile ? userProfile.id : "guest",
      user_provider: service.provider?.id,
    });

    userProfile
      ? Linking.openURL(
          `whatsapp://send?text=Olá ${service.provider?.name}! Encontrei seu contato no IndicApp. Gostaria de um orçamento para o serviço ${service.title}&phone=+55${service.provider?.phone}`
        )
      : navigation.navigate("SignIn");
  }

  async function handleEditServiceAd(serviceId: string) {
    navigation.navigate("EditServiceAd", {
      serviceAdId: serviceId,
    });
  }

  return (
    <ResultItem>
      <ContentWrapper onPress={() => handleServiceDetails(`${service.id}`)}>
        <TagWrapper>
          <Tag>
            <TagText>{service.serviceType?.name}</TagText>
          </Tag>
        </TagWrapper>
        <TitleWrapper>
          <AppText bold size="lg">
            {service.title}
          </AppText>
        </TitleWrapper>
        {showDescription && <AppText>{service.description}</AppText>}
        {showReviewScore && (
          <AppStarsScore
            reviewCount={service.review?.count ?? 0}
            score={service.review?.score_total ?? 0}
          />
        )}

        <AppSpacer verticalSpace="lg" />
        <ProviderPriceWrapper>
          {showProvider && (
            <ProviderInfoWrapper>
              <ProviderAvatar
                source={{
                  uri: service.provider?.image,
                }}
              />
              <ProviderName>
                <AppText bold>{service.provider?.name}</AppText>
              </ProviderName>
            </ProviderInfoWrapper>
          )}

          <AppText bold size="lg" color={theme.colors.primary_dark}>
            {`R$ ${service ? service.value.toFixed(2) : 0}`}
          </AppText>
        </ProviderPriceWrapper>

        {userProfile && userProfile?.id === service.provider?.id ? (
          <OwnerButtonsWrapper>
            <AppButton size="sm" title="Excluir" variant="negative" />
            <AppButton
              size="sm"
              title="Editar"
              onPress={() => handleEditServiceAd(`${service.id}`)}
            />
          </OwnerButtonsWrapper>
        ) : (
          <>
            {showButton && buttonType === "details" && (
              <AppButton
                title="Ver mais detalhes"
                onPress={() => handleServiceDetails(`${service.id}`)}
              />
            )}
            {showButton && buttonType === "contact" && (
              <AppButton
                title="Entrar em contato!"
                onPress={handleContactProvider}
                variant="positive"
              />
            )}
          </>
        )}
      </ContentWrapper>
    </ResultItem>
  );
}
