import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import styled from "styled-components/native";

const TextSizes: { [size: string]: number } = {
  xlg: 32,
  lg: 24,
  md: 18,
  sm: 14,
  xsm: 10,
};

export interface AppTextStyleProps extends TextProps {
  children: ReactNode;
  bold?: boolean;
  size?: "xlg" | "lg" | "md" | "sm" | "xsm";
  color?: string;
}

export const TextContainer = styled(Text)<AppTextStyleProps>`
  font-family: ${({ theme, bold }) =>
    bold ? theme.fonts.bold : theme.fonts.regular};
  font-size: ${({ theme, size = "md" }) => TextSizes[size]}px;
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
`;
