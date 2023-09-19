import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
`;
