import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { Service } from "src/@types/services/Service";
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
  item: Service;
  buttonType?: "details" | "contact";
};

export default function AppService({
  item,
  buttonType = "details",
}: AppServiceProps) {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function handleServiceDetails(serviceId: string) {
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
            <TagText>{item.serviceType.name}</TagText>
          </Tag>
        </TagWrapper>

        <ProviderPriceWrapper>
          <ProviderInfoWrapper>
            <ProviderAvatar
              source={{
                uri: item.provider.image,
              }}
            />
            <ProviderName>
              <AppText bold>{item.provider.name}</AppText>
            </ProviderName>
          </ProviderInfoWrapper>
          <AppText bold size="lg" color={theme.colors.primary_dark}>
            {`R$ ${item.value.toFixed(2)}`}
          </AppText>
        </ProviderPriceWrapper>
        {buttonType === "details" ? (
          <AppButton
            title="Ver detalhes"
            onPress={() => handleServiceDetails(item.id)}
          />
        ) : (
          <AppButton title="Entrar em contato!" />
        )}
      </ContentWrapper>
    </ResultItem>
  );
}
