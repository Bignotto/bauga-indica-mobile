import styled from "styled-components/native";

export const ContractListContainer = styled.View`
  padding-top: 12px;
  gap: 12px;
`;

export const ContractItemContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
`;

export const ContractInformationWrapper = styled.View`
  flex: 1;
`;

export const ContractTitle = styled.View`
  padding-left: 8px;
`;

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
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ProviderInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 8px;
`;
