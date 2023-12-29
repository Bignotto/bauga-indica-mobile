import { rgba } from "polished";
import styled from "styled-components/native";

export const ModalItemsWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => rgba("#000", 0.2)};

  padding: 36px;
  align-items: center;
`;

export const ContentWrapper = styled.View`
  height: 75%;
  width: 100%;
  margin: 36px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.border};
  border-width: 2px;
  border-radius: 18px;
`;

export const OptionsWrapper = styled.View`
  flex: 1;
`;

export const CancelButton = styled.View`
  background-color: ${({ theme }) => theme.colors.negative};
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
`;
