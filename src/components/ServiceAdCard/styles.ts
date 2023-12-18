import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ResultItem = styled.View`
  width: 100%;

  /*TODO: fix margin bottom should not be inside component */
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleWrapper = styled.View`
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
`;

export const ContentWrapper = styled.View`
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 8px;
`;

export const ProviderPriceWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const TagWrapper = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Tag = styled.View`
  padding: 4px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
  padding-left: 8px;
  padding-right: 12px;
`;

export const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ProviderInfoWrapper = styled.View`
  flex-direction: row;
`;
export const ProviderAvatar = styled.Image`
  height: 36px;
  width: 36px;
  border-radius: 18px;
`;

export const ProviderName = styled.View`
  justify-content: center;
  margin-left: 8px;
`;
