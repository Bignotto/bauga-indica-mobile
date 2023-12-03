import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View``;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => "#F9F9F9"};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.border};
  border-width: 1px;
`;

// export const InputComponent = styled(TextInput).attrs<TextInput>({
//   placeholderTextColor: "#4A5568",
// })`
export const InputComponent = styled.TextInput`
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
