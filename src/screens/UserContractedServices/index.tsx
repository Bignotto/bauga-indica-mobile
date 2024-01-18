import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { IContract, useData } from "@hooks/DataContext";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ContractTitle } from "./styles";

export default function UserContractedServices() {
  const { getUserContractedServices } = useData();
  const [contractsList, setContractsList] = useState<IContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadContractsList() {
    setIsLoading(true);

    try {
      const response = await getUserContractedServices();
      console.log(JSON.stringify(response, null, 2));
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
        contractsList &&
        contractsList.map((contract) => (
          <>
            <ContractTitle key={contract.id}>
              <AppText>{contract.service_id.title}</AppText>
            </ContractTitle>
          </>
        ))
      )}
    </AppScreenContainer>
  );
}
