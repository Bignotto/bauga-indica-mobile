import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StarsContainer } from "./styles";

interface StarsScoreProps {
  score: number;
  reviewCount: number;
}

export default function AppStarsScore({ score, reviewCount }: StarsScoreProps) {
  const stars =
    Math.floor(score / reviewCount) > 0 ? Math.floor(score / reviewCount) : 0;
  const starCount = stars > 0 ? Array(stars).fill(true) : [];

  const halfStar = score % reviewCount >= 0.5 ? true : false;

  const emptyStars =
    starCount.length === 0
      ? Array(5).fill(true)
      : Array(halfStar ? 4 - stars : 5 - stars).fill(true);

  return (
    <StarsContainer>
      {starCount.map((s, i) => (
        <FontAwesome name="star" size={24} color="gold" key={i} />
      ))}
      {halfStar && (
        <FontAwesome name="star-half-empty" size={24} color="gold" />
      )}
      {emptyStars.map((s, i) => (
        <FontAwesome name="star-o" size={24} color="gold" key={i} />
      ))}
    </StarsContainer>
  );
}
