import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const SelectorContainer = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 16px;
`;

export const AdImageAddButtonWrapper = styled.View`
  overflow: hidden;
  flex: 1;
`;

export const AdImageAddButton = styled(RectButton)<RectButtonProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  height: 164px;
  width: 100px;
  align-items: center;
  justify-content: center;
`;
