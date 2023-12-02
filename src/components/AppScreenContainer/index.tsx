import { StatusBar } from "expo-status-bar";
import { getContrast } from "polished";
import React, { ReactNode } from "react";
import {
  AppScreenContainerStylesProps,
  FooterContainer,
  HeaderContainer,
  HeaderSpace,
  ScreenContainer,
} from "./styles";

interface AppScreenContainerProps extends AppScreenContainerStylesProps {
  header?: ReactNode;
  headerColor?: string;
  footer?: ReactNode;
  footerColor?: string;
}

export default function AppScreenContainer({
  header,
  headerColor,
  footer,
  footerColor,
  children,
}: AppScreenContainerProps) {
  return (
    <>
      <StatusBar
        style={
          headerColor
            ? getContrast(headerColor, "#000000") > 10
              ? "dark"
              : "light"
            : "dark"
        }
      />
      {header ? (
        <HeaderContainer color={headerColor}>{header}</HeaderContainer>
      ) : (
        <HeaderSpace color={headerColor} />
      )}
      <ScreenContainer>{children}</ScreenContainer>
      {footer && (
        <FooterContainer color={footerColor}>{footer}</FooterContainer>
      )}
    </>
  );
}
