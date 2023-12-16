import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: ${() => getStatusBarHeight() + 8}px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
`;

export const SignedOutContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SignedInContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
