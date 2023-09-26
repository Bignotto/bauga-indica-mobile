import React from "react";
import { AppScreenContainerStylesProps, ScreenContainer } from "./styles";

export default function AppScreenContainer({
  children,
}: AppScreenContainerStylesProps) {
  return <ScreenContainer>{children}</ScreenContainer>;
}
