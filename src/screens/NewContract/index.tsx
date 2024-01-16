import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { FontAwesome5 } from "@expo/vector-icons";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import AppService from "@screens/SearchResults/ResultList/AppService";
import React, { useState } from "react";
import { Alert } from "react-native";
import { InfoPanel } from "./styles";

type Params = {
  service: IUserServiceAd;
};

export default function NewContract() {
  const route = useRoute();
  const { service } = route.params as Params;

  const { createNewContract, createNewMessage, userProfile } = useData();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [message, setMessage] = useState(
    `Olá ${service.providerId?.name}! Gostaria de um orçamento e da sua disponibilidade para o serviço descrito acima. Obrigado.`
  );

  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateContract() {
    //navegar para a próxima página -> contract details
    setIsLoading(true);
    try {
      const createdContract = await createNewContract({
        service_id: `${service.id}`,
        value: service.value,
      });

      const createdMessage = await createNewMessage({
        contractId: createdContract.id!,
        messageRead: false,
        text: message,
        userFromId: userProfile?.id!,
        messageDate: new Date(),
      });

      navigation.navigate("ContractDetails", {
        contractId: createdContract.id!,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) return Alert.alert(error.message);
      return Alert.alert("erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppScreenContainer>
      <AppSpacer />
      <InfoPanel>
        <AppText>
          Entre em contato com {service.providerId?.name} para combinar os
          detalhes do serviço que você precisa e quando quer o serviço
          executado.
        </AppText>
      </InfoPanel>
      <AppText>Contatar {service.providerId?.name} sobre:</AppText>
      <AppSpacer />
      <AppService item={service} showButton={false} />
      <AppInput
        label="Mensagem:"
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <AppButton
        title="Enviar mensagem"
        variant="positive"
        rightIcon={<FontAwesome5 name="whatsapp" size={24} color="white" />}
        onPress={handleCreateContract}
        isLoading={isLoading}
      />
    </AppScreenContainer>
  );
}
