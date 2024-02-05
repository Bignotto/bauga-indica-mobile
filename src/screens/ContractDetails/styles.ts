import styled from "styled-components/native";

interface MessageItemProps {
  isSender: boolean;
}

export const TopWrapper = styled.View`
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;
`;

export const NegotiationWrapper = styled.View`
  flex-direction: row;
  margin-top: 12px;
  gap: 8px;
`;

export const MessagesList = styled.View`
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 8px;
`;

export const MessageWrapper = styled.View<MessageItemProps>`
  align-items: ${({ theme, isSender }) =>
    isSender ? "flex-end" : "flex-start"};
`;

export const MessageItem = styled.View`
  max-width: 80%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 4px;
`;
