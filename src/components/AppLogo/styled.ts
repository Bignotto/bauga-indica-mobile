import { ReactNode } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const LogoSizes: { [size: string]: number } = {
  sm: 24,
  md: 32,
  lg: 80,
};

const LineHeights: { [size: string]: number } = {
  sm: 45,
  md: 32,
  lg: 76,
};

export interface AppLogoStyleProps {
  children?: ReactNode;
  size?: "lg" | "md" | "sm";
  color?: string;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const AppLogoText = styled(Text)<AppLogoStyleProps>`
  font-family: ${({ theme }) => theme.fonts.logo};
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
  font-size: ${({ theme, size = "md" }) => LogoSizes[size]}px;
  line-height: ${({ theme, size = "md" }) => LineHeights[size]}px;
  padding-top: ${({ theme, size = "md" }) => (size === "lg" ? 25 : 0)}px;
`;

export const TextLg = styled.Text`
  font-size: 56px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: 63px;
`;

export const TextMd = styled.Text`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: 40px;
`;

export const TextSm = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
