import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  padding-top: ${() => getStatusBarHeight() + 8}px;
`;
