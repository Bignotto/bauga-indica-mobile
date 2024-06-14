import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ResultItem = styled.View`
  width: 100%;

  margin-bottom: 8px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  /* border-radius: 8px;
    border-width: 1px;
    border-color: gray; */
`;

export const TitleWrapper = styled.View`
  padding-right: 8px;
`;

export const ContentWrapper = styled(RectButton)`
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

export const OwnerButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;
