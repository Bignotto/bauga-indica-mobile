import React, { ReactNode } from "react";
import { Tag, TagText, TagWrapper } from "./styles";

interface AppTagProps {
  children: ReactNode;
}

export default function AppTag({ children }: AppTagProps) {
  return (
    <TagWrapper>
      <Tag>
        <TagText>{children}</TagText>
      </Tag>
    </TagWrapper>
  );
}
