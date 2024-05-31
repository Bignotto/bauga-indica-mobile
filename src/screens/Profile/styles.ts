import { RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  padding-top: ${() => getStatusBarHeight() + 8}px;
`;

export const AvatarWrapper = styled.View`
  overflow: hidden;
`;

export const ImageEditIcon = styled(RectButton)`
  position: absolute;
  right: 15px;
  bottom: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.text_disabled};
  padding: 2px;
`;
export const RemoveIconButton = styled(RectButton)``;
