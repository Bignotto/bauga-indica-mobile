import AppAvatar from "@components/AppAvatar";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { IContract, useData } from "@hooks/DataContext";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image } from "react-native";
import { useTheme } from "styled-components";
import {
  ContractInformationWrapper,
  ContractItemContainer,
  ContractListContainer,
  ContractTitle,
  IconWrapper,
  ImageWrapper,
} from "./styles";

export default function UserContractedServices() {
  const { getUserContractedServices } = useData();
  const theme = useTheme();
  const [contractsList, setContractsList] = useState<IContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadContractsList() {
    setIsLoading(true);

    try {
      const response = await getUserContractedServices();

      if (response) setContractsList(response);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContractsList();
  }, []);

  return (
    <AppScreenContainer>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ContractListContainer>
          {contractsList &&
            contractsList.length > 0 &&
            contractsList.map((contract) => (
              <ContractItemContainer key={contract.id}>
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
                  <ContractTitle>
                    <AppText bold>{contract.service_id.title}</AppText>
                    <AppText bold size="md" color={theme.colors.primary_dark}>
                      {`R$ ${contract.value.toFixed(2)}`}
                    </AppText>
                    <AppSpacer verticalSpace="sm" />
                    <AppAvatar
                      size={28}
                      imagePath={contract.user_provider_id.image}
                    />
                  </ContractTitle>
                </ContractInformationWrapper>
                <IconWrapper>
                  <AntDesign
                    name="arrowright"
                    size={24}
                    color={theme.colors.text_gray}
                  />
                </IconWrapper>
              </ContractItemContainer>
            ))}
        </ContractListContainer>
      )}
    </AppScreenContainer>
  );
}
