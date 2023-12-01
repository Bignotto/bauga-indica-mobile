import React from "react";
import { AvatarImage } from "./styles";

type AvatarImageProps = {
  imagePath: string;
  size: number;
};

export default function AppAvatar({ imagePath, size }: AvatarImageProps) {
  return (
    <AvatarImage
      source={{
        uri: imagePath,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
}
