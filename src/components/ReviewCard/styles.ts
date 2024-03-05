import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  margin-bottom: 8px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
