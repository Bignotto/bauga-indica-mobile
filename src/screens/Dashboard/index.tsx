import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
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

  async function loadDashboardData() {
    try {
      const responseData = await getDashboardData();
      setDashboardData(responseData);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      Alert.alert("Erro ao carregar dados");
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function handlePress() {}

  return (
    <AppScreenContainer header={<Header />} headerColor={theme.colors.white}>
      <AppText size="xlg">Dashboard</AppText>
      <AppSpacer />
      <ScrollView>
        <DashboardContainer>
          <DashboardItem
            title="Anúncios"
            description="seus anúncios cadastrados"
            information={`${dashboardData?.servicesCount}`}
            onPress={() =>
              navigation.navigate("ServiceDetails", {
                serviceId: "mcDYCcX4ub4Z3e9wRH1Tig",
              })
            }
          />
          <DashboardItem
            title="Visualizações"
            description="visualizações em seus anúncios"
            information={`${dashboardData?.visualisationsCount}`}
          />
          <DashboardItem
            title="Contratos"
            description="seus serviços prestados"
            information={`${dashboardData?.contractsCount}`}
          />
          <DashboardItem
            title="Avaliações"
            description="suas avaliações recebidas"
            information={`${dashboardData?.reviewsCount}`}
          />
        </DashboardContainer>
      </ScrollView>
      <AppButton title="test" onPress={handlePress} />
    </AppScreenContainer>
  );
}
