import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import React from "react";
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
}

export default function DashboardItem({
  title,
  description,
  information,
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
        <AppText>{information}</AppText>
      </InformationContainer>
    </DashboardItemContainer>
  );
}
