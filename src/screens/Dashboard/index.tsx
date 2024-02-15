import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { IDashboardData, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import DashboardItem from "./DashboardItem";
import { DashboardContainer } from "./styles";

export default function Dashboard() {
  const theme = useTheme();
  const { getDashboardData } = useData();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [dashboardData, setDashboardData] = useState<IDashboardData>();
  const [isLoading, setIsLoading] = useState(true);

  async function loadDashboardData() {
    try {
      const responseData = await getDashboardData();
      setDashboardData(responseData);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      Alert.alert("Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <AppScreenContainer>
      <AppText size="xlg" bold>
        Dashboard
      </AppText>
      <AppSpacer />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DashboardContainer>
          <DashboardItem
            title="Serviços contratados"
            description="os serviços que você contratou"
            information={`${dashboardData?.servicesContractedCount} serviços`}
            isLoading={isLoading}
            onPress={() => navigation.navigate("UserContractedServices")}
          />
          <DashboardItem
            title="Contratos"
            description="seus serviços prestados"
            information={`${dashboardData?.contractsCount} contratos`}
            isLoading={isLoading}
            onPress={() => navigation.navigate("UserProvidedServices")}
          />
          <DashboardItem
            title="Anúncios"
            description="seus anúncios cadastrados"
            information={`${dashboardData?.servicesAdCount} anúncios`}
            isLoading={isLoading}
            onPress={() => navigation.navigate("UserServiceAds")}
          />
          <DashboardItem
            title="Visualizações"
            description="visualizações em seus anúncios"
            information={`${dashboardData?.visualisationsCount} visualizações`}
            isLoading={isLoading}
          />
          <DashboardItem
            title="Avaliações"
            description="suas avaliações recebidas"
            information={`${dashboardData?.reviewsCount} avaliações`}
            isLoading={isLoading}
          />
        </DashboardContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
