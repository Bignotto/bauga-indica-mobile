import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { useData } from "@hooks/DataContext";
import React from "react";
import { useTheme } from "styled-components";

export default function Dashboard() {
  const theme = useTheme();
  const { getDashboardData } = useData();

  async function handlePress() {
    await getDashboardData();
  }
  return (
    <AppScreenContainer header={<Header />} headerColor={theme.colors.white}>
      <AppText size="xlg">Dashboard</AppText>
      <AppButton title="test" onPress={handlePress} />
    </AppScreenContainer>
  );
}
