import AppText from "@components/AppText";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Container, StarsContainer } from "./styles";

interface ReviewScoreCardProps {
  score: number;
  reviewCount: number;
}

export default function ReviewScoreCard({
  score,
  reviewCount,
}: ReviewScoreCardProps) {
  const starCount = Array(Math.floor(score / reviewCount)).fill(true);
  const halfStar = score % reviewCount >= 0.5 ? true : false;

  console.log({ starCount });
  return (
    <Container>
      <StarsContainer>
        {starCount.map((s, i) => (
          <FontAwesome name="star" size={24} color="yellow" key={i} />
        ))}
        {halfStar && <FontAwesome name="star-half" size={24} color="yellow" />}
      </StarsContainer>
      <AppText size="lg">Nota: {score / reviewCount}</AppText>
    </Container>
  );
}
