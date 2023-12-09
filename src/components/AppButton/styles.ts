import { rgba } from "polished";
import { ReactNode } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface ButtonProps extends RectButtonProps {
  color?: string;
  children: ReactNode;
  size?: "lg" | "md" | "sm";
}

interface WrapperProps {
  outline: boolean;
  color: string;
}

export const ButtonWrapper = styled.View<WrapperProps>`
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid
    ${({ theme, color }) => (color ? color : theme.colors.primary)};
  background-color: ${({ theme, outline, color }) =>
    outline ? rgba(color, 0.2) : color};
`;

export const ButtonContainer = styled(RectButton)<ButtonProps>`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  /* background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary}; */
  height: ${({ theme, size = "md" }) =>
    size === "lg" ? 54 : size === "md" ? 44 : 36}px;
`;
