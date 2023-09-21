import styled from "styled-components/native";

export const HomeContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const SearchInputWrapper = styled.View`
  width: 100%;
  margin-top: 32px;
  gap: 16px;
`;

export const CenterScreen = styled.View`
  background-color: red;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
