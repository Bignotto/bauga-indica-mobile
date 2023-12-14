import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import React from "react";
import {
  DashboardItemColorBorder,
  DashboardItemContainer,
  InformationContainer,
} from "./styles";

interface DashboardItemProps {
  title: string;
  description?: string;
  navigateTo?: string;
  information: string;
}

export default function DashboardItem({
  title,
  description,
  navigateTo,
  information,
}: DashboardItemProps) {
  return (
    <DashboardItemContainer>
      <DashboardItemColorBorder />
      <InformationContainer>
        <AppText bold size="xlg">
          {title}
        </AppText>
        <AppText size="sm">{description}</AppText>
        <AppSpacer verticalSpace="md" />
        <AppText>{information}</AppText>
      </InformationContainer>
    </DashboardItemContainer>
  );
}
