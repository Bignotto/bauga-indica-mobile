import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContainer = styled.View`
  flex-direction: column;
`;

export const LoginFormContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 8px;
`;

export const FormContainer = styled.View``;
