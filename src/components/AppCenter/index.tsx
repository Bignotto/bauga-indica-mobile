import React, { ReactNode } from "react";
import { ViewProps } from "react-native";
import { Container } from "./styles";

interface AppCenterProps extends ViewProps {
  children: ReactNode;
}

export default function AppCenter({ children, ...rest }: AppCenterProps) {
  return <Container {...rest}>{children}</Container>;
}
