import AppAvatar from "@components/AppAvatar";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { IServiceReview } from "@hooks/DataContext";
import moment from "moment";
import React from "react";
import { CardHeader, Container } from "./styles";

interface CardReviewProps {
  review: IServiceReview;
}

export default function ReviewCard({ review }: CardReviewProps) {
  return (
    <Container>
      <AppText size="lg" bold>
        {review.title}
      </AppText>
      <AppText size="sm">
        {moment(review.review_date).format("DD/MM/yyyy")}
      </AppText>
      <AppSpacer />
      <AppText>{review.text}</AppText>
      <AppSpacer />
      <CardHeader>
        <AppAvatar imagePath={review.reviewer_id.image} size={28} />
        <AppText bold size="md">
          {review.reviewer_id.name}
        </AppText>
      </CardHeader>
    </Container>
  );
}
