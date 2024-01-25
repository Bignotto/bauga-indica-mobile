import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { IContract, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { NegotiationWrapper, TopWrapper } from "./styles";

type Params = {
  contractId: string;
};

export default function ContractDetails() {
  const route = useRoute();
  const { contractId } = route.params as Params;

  const { getContractById } = useData();

  const [contract, setContract] = useState<IContract>({} as IContract);
  const [isLoading, setIsLoading] = useState(true);

  async function loadContractDetails() {
    setIsLoading(true);
    try {
      const response = await getContractById(contractId);
      setContract(response);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      return Alert.alert("erro ao acessar dados");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContractDetails();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <AppScreenContainer>
      <TopWrapper>
        <AppText size="lg" bold>
          {contract.service_id.title}
        </AppText>
        <AppText>{contract.service_id.description}</AppText>
      </TopWrapper>
      <NegotiationWrapper>
        <AppText>O serviço será executado em:</AppText>
        <Pressable onPress={() => console.log("pressou!")}>
          <AppInput editable={false} />
        </Pressable>
        <AppText>Valor total do serviço</AppText>
        <AppInput />

        <AppButton title="Salvar" />
      </NegotiationWrapper>
    </AppScreenContainer>
  );
}
