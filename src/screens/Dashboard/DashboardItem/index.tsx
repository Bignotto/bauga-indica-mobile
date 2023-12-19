import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import {
  DashboardItemColorBorder,
  DashboardItemContainer,
  InformationContainer,
} from "./styles";

interface DashboardItemProps extends RectButtonProps {
  title: string;
  description?: string;
  information: string;
  isLoading?: boolean;
}

export default function DashboardItem({
  title,
  description,
  information,
  isLoading = false,
  ...rest
}: DashboardItemProps) {
  return (
    <DashboardItemContainer {...rest}>
      <DashboardItemColorBorder />
      <InformationContainer>
        <AppText bold size="xlg">
          {title}
        </AppText>
        <AppText size="sm">{description}</AppText>
        <AppSpacer verticalSpace="md" />
        {isLoading ? <ActivityIndicator /> : <AppText>{information}</AppText>}
      </InformationContainer>
    </DashboardItemContainer>
  );
}
