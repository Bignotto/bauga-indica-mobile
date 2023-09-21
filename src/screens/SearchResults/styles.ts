import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const ScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${() => getStatusBarHeight() + 8}px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderWrapper = styled.View`
  margin-bottom: 16px;
`;
