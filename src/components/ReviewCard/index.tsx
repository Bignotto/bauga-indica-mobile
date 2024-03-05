import AppAvatar from "@components/AppAvatar";
import AppText from "@components/AppText";
import { IServiceReview } from "@hooks/DataContext";
import moment from "moment";
import React from "react";
import { Container } from "./styles";

interface CardReviewProps {
  review: IServiceReview;
}

export default function ReviewCard({ review }: CardReviewProps) {
  return (
    <Container>
      <AppAvatar imagePath={review.reviewer_id.image} size={28} />
      <AppText bold size="md">
        {review.reviewer_id.name}
      </AppText>
      <AppText>{review.title}</AppText>
      <AppText size="sm">
        {moment(review.review_date).format("DD/MM/yyyy")}
      </AppText>
      <AppText>{review.text}</AppText>
    </Container>
  );
}
