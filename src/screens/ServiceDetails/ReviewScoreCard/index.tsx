import AppStarsScore from "@components/AppStarsScore";
import AppText from "@components/AppText";
import React from "react";
import { Container } from "./styles";

interface ReviewScoreCardProps {
  score: number;
  reviewCount: number;
}

export default function ReviewScoreCard({
  score,
  reviewCount,
}: ReviewScoreCardProps) {
  return (
    <Container>
      <AppStarsScore reviewCount={reviewCount} score={score} />
      <AppText size="sm" bold>
        Nota: {isNaN(score / reviewCount) ? 0 : score / reviewCount}
      </AppText>
    </Container>
  );
}
