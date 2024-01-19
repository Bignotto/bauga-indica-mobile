import styled from "styled-components/native";

export const ContractListContainer = styled.View`
  padding-top: 12px;
  gap: 12px;
`;

export const ContractItemContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContractInformationWrapper = styled.View`
  flex: 1;
  padding: 8px;
`;

export const ContractTitle = styled.View``;

export const IconWrapper = styled.View`
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.View`
  height: 160px;
  width: 120px;
  align-items: center;
  justify-content: center;
`;
