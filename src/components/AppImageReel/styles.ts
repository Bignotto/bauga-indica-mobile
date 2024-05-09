import styled from "styled-components/native";

interface IndexIndicatorProps {
  indexWidth: number;
  highlight: boolean;
  left: number;
}

export const Container = styled.View`
  flex: 1;
`;

export const IndexIndicator = styled.View<IndexIndicatorProps>`
  position: absolute;
  left: ${({ theme, indexWidth, highlight, left }) => left}px;
  bottom: 8px;
  height: 4px;
  border-radius: 2px;
  width: ${({ theme, indexWidth }) => indexWidth}px;
  background-color: #ffffff;
  opacity: ${({ theme, indexWidth, highlight }) => (highlight ? 0.8 : 0.5)};
`;
