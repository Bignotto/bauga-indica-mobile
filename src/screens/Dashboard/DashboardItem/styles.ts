import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const DashboardItemContainer = styled(RectButton)<RectButtonProps>`
  flex-direction: row;
  height: 155px;
  margin: 8px;
`;

export const DashboardItemColorBorder = styled.View`
  width: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const InformationContainer = styled.View`
  flex: 1;
  padding-left: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
`;
