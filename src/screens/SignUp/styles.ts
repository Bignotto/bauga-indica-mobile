import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContainer = styled.View`
  flex-direction: column;
  margin: 16px;
  margin-top: ${() => getStatusBarHeight() + 8}px;
`;

export const LoginFormContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 8px;
`;

export const FormContainer = styled.View``;
