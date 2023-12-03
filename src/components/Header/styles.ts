import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SignedOutContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SignedInContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
