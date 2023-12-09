import React from "react";
import { View } from "react-native";

type AppSpacerProps = {
  horizontalSpace?: "xlg" | "lg" | "md" | "sm";
  verticalSpace?: "xlg" | "lg" | "md" | "sm";
};

export default function AppSpacer({
  horizontalSpace = "md",
  verticalSpace = "md",
}: AppSpacerProps) {
  const hSpace =
    horizontalSpace === "xlg"
      ? 20
      : horizontalSpace === "lg"
      ? 16
      : horizontalSpace === "md"
      ? 12
      : 8;

  const vSpace =
    verticalSpace === "xlg"
      ? 20
      : verticalSpace === "lg"
      ? 16
      : verticalSpace === "md"
      ? 12
      : 8;
  return (
    <View
      style={{
        width: hSpace,
        height: vSpace,
      }}
    />
  );
}
