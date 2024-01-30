import AppAvatar from "@components/AppAvatar";
import AppSpacer from "@components/AppSpacer";
import AppTag from "@components/AppTag";
import AppText from "@components/AppText";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { IContract } from "@hooks/DataContext";
import moment from "moment";
import React from "react";
import { Image, View } from "react-native";
import { useTheme } from "styled-components";
import {
  ContractInformationWrapper,
  ContractItemContainer,
  ContractStatusWrapper,
  ContractTitle,
  DateWrapper,
  IconWrapper,
  ImageWrapper,
  ProviderInfoWrapper,
} from "./styles";

interface ContractCardProps {
  contract: IContract;
}

export default function ContractCard({ contract }: ContractCardProps) {
  const theme = useTheme();
  const statusTagText =
    contract.provider_agreed || contract.contractor_agreed
      ? "Aguardando"
      : contract.provider_agreed && contract.contractor_agreed
      ? "Combinado"
      : "Aberto";

  console.log({
    contractor: contract.user_contractor_id,
    provider: contract.user_provider_id,
  });
  return (
    <ContractItemContainer>
      <ImageWrapper>
        {contract.service_id.service_images &&
        contract.service_id.service_images?.length > 0 ? (
          <Image
            height={160}
            width={120}
            source={{
              uri: contract.service_id.service_images[0].imagePath,
            }}
          />
        ) : (
          <MaterialIcons
            name="no-photography"
            size={24}
            color={theme.colors.text_disabled}
          />
        )}
      </ImageWrapper>
      <ContractInformationWrapper>
        {/* TODO: fix which to choose, contractor info or provider info */}
        <ProviderInfoWrapper>
          <AppAvatar size={24} imagePath={contract.user_contractor_id.image} />
          <AppText bold size="sm">
            {contract.user_contractor_id.name}
          </AppText>
        </ProviderInfoWrapper>
        <AppSpacer />
        <ContractTitle>
          <AppText bold>{contract.service_id.title}</AppText>
          <AppText bold size="md" color={theme.colors.primary_dark}>
            {`R$ ${contract.value.toFixed(2)}`}
          </AppText>
        </ContractTitle>

        <View
          style={{
            marginLeft: 8,
          }}
        >
          <AppTag>
            {contract.contract_status === "open" ||
            contract.contract_status === "executing"
              ? statusTagText
              : contract.contract_status === "canceled"
              ? "Cancelado"
              : "Fechado"}
          </AppTag>
        </View>

        <ContractStatusWrapper>
          <DateWrapper>
            <AppText size="sm">Aberto</AppText>
            <AppText size="sm" bold color={theme.colors.text_disabled}>
              {moment(contract.create_date).format("DD/MM/yyyy")}
            </AppText>
          </DateWrapper>
        </ContractStatusWrapper>
      </ContractInformationWrapper>
      <IconWrapper>
        {contract.contract_status === "open" ? (
          <MaterialIcons
            name="hourglass-empty"
            size={24}
            color={theme.colors.secondary}
          />
        ) : contract.contract_status === "executing" ? (
          <FontAwesome5
            name="handshake"
            size={20}
            color={theme.colors.primary}
          />
        ) : contract.contract_status === "closed" ? (
          <AntDesign
            name="checksquare"
            size={20}
            color={theme.colors.positive}
          />
        ) : (
          <MaterialIcons name="block" size={24} color={theme.colors.negative} />
        )}
      </IconWrapper>
    </ContractItemContainer>
  );
}
