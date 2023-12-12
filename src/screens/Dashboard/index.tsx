import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import React from "react";
import { useTheme } from "styled-components";

export default function Dashboard() {
  const theme = useTheme();
  return (
    <AppScreenContainer header={<Header />} headerColor={theme.colors.white}>
      <AppText size="xlg">Dashboard</AppText>
    </AppScreenContainer>
  );
}
