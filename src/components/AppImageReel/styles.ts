import styled from "styled-components/native";

interface IndexIndicatorProps {
  indexWidth: number;
  highlight: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const IndexIndicator = styled.View<IndexIndicatorProps>`
  position: absolute;
  left: ${({ theme, indexWidth }) => indexWidth}px;
  bottom: 8px;
  height: 1px;
  width: ${({ theme, indexWidth }) => indexWidth - 10}px;
  background-color: #1a202c;
  opacity: ${({ theme, indexWidth, highlight }) => (highlight ? 0.8 : 0.5)};
`;
