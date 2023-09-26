import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppService from "@components/AppService";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Service } from "src/@types/services/Service";

type Params = {
  serviceData: Service;
};

export default function NewContract() {
  const route = useRoute();
  const { serviceData } = route.params as Params;
  return (
    <AppScreenContainer>
      <AppText>Contatar {serviceData.provider.name} sobre:</AppText>
      <AppService item={serviceData} showButton={false} buttonType="contact" />
      <AppInput label="Mensagem" />
      <AppButton title="Enviar mensagem" />
    </AppScreenContainer>
  );
}
