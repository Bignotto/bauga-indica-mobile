import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppService from "@components/AppService";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Service } from "src/@types/services/Service";
import { InfoPanel, Spacer } from "./styles";

type Params = {
  serviceData: Service;
};

export default function NewContract() {
  const route = useRoute();
  const { serviceData } = route.params as Params;

  const [message, setMessage] = useState(
    `Olá ${serviceData.provider.name}! Gostaria de um orçamento e da sua disponibilidade para o serviço descrito acima. Obrigado.`
  );
  return (
    <AppScreenContainer>
      <Spacer />
      <AppText>Contatar {serviceData.provider.name} sobre:</AppText>
      <Spacer />
      <AppService item={serviceData} showButton={false} buttonType="contact" />
      <InfoPanel>
        <AppText>
          Entre em contato com {serviceData.provider.name} para combinar os
          detalhes do serviço que você precisa e quando quer o serviço
          executado.
        </AppText>
      </InfoPanel>
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
        style={{
          marginTop: 16,
        }}
      />
    </AppScreenContainer>
  );
}
