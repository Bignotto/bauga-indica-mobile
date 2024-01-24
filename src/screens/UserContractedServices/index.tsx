import AppAvatar from "@components/AppAvatar";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppTag from "@components/AppTag";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { IContract, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import {
  ContractInformationWrapper,
  ContractItemContainer,
  ContractListContainer,
  ContractStatusWrapper,
  ContractTitle,
  DateWrapper,
  IconWrapper,
  ImageWrapper,
  ProviderInfoWrapper,
} from "./styles";

export default function UserContractedServices() {
  const { getUserContractedServices } = useData();
  const theme = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

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
        <ScrollView>
          <ContractListContainer>
            {contractsList &&
              contractsList.length > 0 &&
              contractsList.map((contract) => {
                //TODO: make contract card a component
                const statusTagText =
                  contract.provider_agreed || contract.contractor_agreed
                    ? "Aguardando"
                    : contract.provider_agreed && contract.contractor_agreed
                    ? "Combinado"
                    : "Aberto";
                return (
                  <Pressable
                    key={contract.id}
                    onPress={() =>
                      navigation.navigate("ContractDetails", {
                        contractId: `${contract.id}`,
                      })
                    }
                  >
                    <ContractItemContainer>
                      <ImageWrapper>
                        {contract.service_id.service_images &&
                        contract.service_id.service_images?.length > 0 ? (
                          <Image
                            height={160}
                            width={120}
                            source={{
                              uri: contract.service_id.service_images[0]
                                .imagePath,
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
                        <ProviderInfoWrapper>
                          <AppAvatar
                            size={24}
                            imagePath={contract.user_provider_id.image}
                          />
                          <AppText bold size="sm">
                            {contract.user_provider_id.name}
                          </AppText>
                        </ProviderInfoWrapper>
                        <AppSpacer />
                        <ContractTitle>
                          <AppText bold>{contract.service_id.title}</AppText>
                          <AppText
                            bold
                            size="md"
                            color={theme.colors.primary_dark}
                          >
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
                            <AppText
                              size="sm"
                              bold
                              color={theme.colors.text_disabled}
                            >
                              {moment(contract.create_date).format(
                                "DD/MM/yyyy"
                              )}
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
                          <MaterialIcons
                            name="block"
                            size={24}
                            color={theme.colors.negative}
                          />
                        )}
                      </IconWrapper>
                    </ContractItemContainer>
                  </Pressable>
                );
              })}
          </ContractListContainer>
        </ScrollView>
      )}
    </AppScreenContainer>
  );
}
