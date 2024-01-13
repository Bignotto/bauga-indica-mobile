import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { FontAwesome5 } from "@expo/vector-icons";
import { IUserServiceAd } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import AppService from "@screens/SearchResults/ResultList/AppService";
import React, { useState } from "react";
import { InfoPanel } from "./styles";

type Params = {
  service: IUserServiceAd;
};

export default function NewContract() {
  const route = useRoute();
  const { service } = route.params as Params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [message, setMessage] = useState(
    `Olá ${service.providerId?.name}! Gostaria de um orçamento e da sua disponibilidade para o serviço descrito acima. Obrigado.`
  );

  const [isLoading, setIsLoading] = useState(true);

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
      />
    </AppScreenContainer>
  );
}
