import styled from "styled-components/native";

interface IndexIndicatorProps {
  highlight: boolean;
}

export const IndexIndicator = styled.View<IndexIndicatorProps>`
  margin: 4px;
  height: 8px;
  border-radius: 4px;
  width: 8px;
  background-color: #1a202c;
  opacity: ${({ highlight }) => (highlight ? 0.2 : 0.4)};
`;
