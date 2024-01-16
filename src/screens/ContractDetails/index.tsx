import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React from "react";

type Params = {
  contractId: number;
};

export default function ContractDetails() {
  const route = useRoute();
  const { contractId } = route.params as Params;

  return (
    <AppScreenContainer>
      <AppText>Contract details for contract {contractId}</AppText>
    </AppScreenContainer>
  );
}
