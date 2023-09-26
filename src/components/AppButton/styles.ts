import { ReactNode } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps extends RectButtonProps {
  color?: string;
  children: ReactNode;
}

export const ButtonContainer = styled(RectButton)<ButtonProps>`
  width: 100%;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary};
  margin-bottom: 8px;
  height: 46px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  color: #ffffff;
`;
