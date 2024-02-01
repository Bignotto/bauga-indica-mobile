import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface WrapperProps {
  error?: string;
}

export const Container = styled.View``;

export const Wrapper = styled.View<WrapperProps>`
  flex-direction: row;
  align-items: center;
  min-width: 130px;
  justify-content: space-between;
  background-color: ${({ theme }) => "#F9F9F9"};
  border-radius: 5px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.negative : theme.colors.border};
  border-width: 1px;
  padding: 10px;
`;

// export const InputComponent = styled(TextInput).attrs<TextInput>({
//   placeholderTextColor: "#4A5568",
// })`
export const InputComponent = styled.TextInput`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MaskedInputComponent = styled(MaskInput)`
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
