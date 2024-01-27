import AppScreenContainer from "@components/AppScreenContainer";
import ContractCard from "@components/ContractCard";
import { AppError } from "@errors/AppError";
import { IContract, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView } from "react-native";
import { useTheme } from "styled-components";
import { ContractListContainer } from "./styles";

export default function UserProvidedServices() {
  const { getUserProvidedServices } = useData();
  const theme = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [contractsList, setContractsList] = useState<IContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadContractsList() {
    setIsLoading(true);

    try {
      const response = await getUserProvidedServices();

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
            {contractsList.length > 0 &&
              contractsList.map((contract) => (
                <Pressable
                  key={contract.id}
                  onPress={() =>
                    navigation.navigate("ContractDetails", {
                      contractId: `${contract.id}`,
                    })
                  }
                >
                  <ContractCard contract={contract} />
                </Pressable>
              ))}
          </ContractListContainer>
        </ScrollView>
      )}
    </AppScreenContainer>
  );
}
