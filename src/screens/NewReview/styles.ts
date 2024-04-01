import styled from "styled-components/native";

export const ProviderInfoContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  padding: 12px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
`;
