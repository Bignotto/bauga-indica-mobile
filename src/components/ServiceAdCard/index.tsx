import AppButton from "@components/AppButton";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { ITopServiceAds, IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
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

interface ServiceAdCard {
  item?: IUserServiceAd;
  topService?: ITopServiceAds;
  buttonType?: "details" | "contact";
  showButton?: boolean;
  showDescription?: boolean;
  showProvider?: boolean;
}

interface ServiceAdCardProps {
  service?: {
    id?: string;
    title?: string;
    description?: string;
    value?: number;
    provider?: {
      id?: string;
      name?: string;
      image?: string;
    };
    rating?: number;
    serviceType?: {
      id?: number;
      name?: string;
    };
  };
  buttonType?: "details" | "contact";
  showButton?: boolean;
  showDescription?: boolean;
  showProvider?: boolean;
}

export default function ServiceAdCard({
  item,
  topService,
  buttonType = "details",
  showButton = true,
  showDescription = true,
  showProvider = true,
}: ServiceAdCard) {
  const { userProfile } = useData();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function handleServiceDetails(serviceId: string) {
    navigation.navigate("ServiceDetails", { serviceId });
  }

  async function handleContactProvider() {
    userProfile
      ? navigation.navigate("NewContract", { service: item! })
      : navigation.navigate("SignIn");
  }

  async function handleEditServiceAd(serviceId: string) {
    navigation.navigate("EditServiceAd", {
      serviceAdId: serviceId,
    });
  }

  const serviceTypeName = topService
    ? topService.service_type
    : item!.serviceTypeId!.name;
  const serviceId = topService ? topService.service_id : item!.id;
  const serviceTitle = topService ? topService.title : item!.title;
  const serviceDescription = topService
    ? topService.description
    : item!.description;
  const providerName = topService
    ? topService.provider_name
    : item!.providerId?.name;
  const providerImage = topService
    ? topService.provider_image
    : item!.providerId?.image;
  const providerId = topService ? topService.provider_id : item!.providerId?.id;
  const serviceValue = topService ? topService.service_value : item!.value;

  return (
    <ResultItem>
      <ContentWrapper>
        <TagWrapper>
          <Tag>
            <TagText>{serviceTypeName}</TagText>
          </Tag>
        </TagWrapper>
        <TitleWrapper>
          <AppText bold size="lg">
            {serviceTitle}
          </AppText>
        </TitleWrapper>
        {showDescription && <AppText>{serviceDescription}</AppText>}

        <AppSpacer verticalSpace="lg" />
        <ProviderPriceWrapper>
          {showProvider && (
            <ProviderInfoWrapper>
              <ProviderAvatar
                source={{
                  uri: providerImage,
                }}
              />
              <ProviderName>
                <AppText bold>{providerName}</AppText>
              </ProviderName>
            </ProviderInfoWrapper>
          )}

          <AppText bold size="lg" color={theme.colors.primary_dark}>
            {`R$ ${serviceValue.toFixed(2)}`}
          </AppText>
        </ProviderPriceWrapper>
        {userProfile?.id === providerId ? (
          <OwnerButtonsWrapper>
            <AppButton size="sm" title="Excluir" variant="negative" />
            <AppButton
              size="sm"
              title="Editar"
              onPress={() => handleEditServiceAd(`${serviceId}`)}
            />
          </OwnerButtonsWrapper>
        ) : (
          <>
            {showButton && buttonType === "details" && (
              <AppButton
                title="Ver mais detalhes"
                onPress={() => handleServiceDetails(`${serviceId}`)}
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
