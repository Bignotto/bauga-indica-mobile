import AppAvatar from "@components/AppAvatar";
import AppSpacer from "@components/AppSpacer";
import AppStarsScore from "@components/AppStarsScore";
import AppText from "@components/AppText";
import { IServiceReview } from "@hooks/DataContext";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { CardHeader, Container, ReviewerContainer } from "./styles";

interface CardReviewProps {
  review: IServiceReview;
}

export default function ReviewCard({ review }: CardReviewProps) {
  return (
    <Container>
      <CardHeader>
        <View>
          <AppText size="lg" bold>
            {review.title}
          </AppText>
          <AppText size="sm">
            {moment(review.review_date).format("DD/MM/yyyy")}
          </AppText>
        </View>

        <AppStarsScore reviewCount={1} score={review.score} />
      </CardHeader>
      <AppSpacer />
      <AppText>{review.text}</AppText>
      <AppSpacer />
      <ReviewerContainer>
        <AppAvatar imagePath={review.reviewer_id.image} size={28} />
        <AppText bold size="md">
          {review.reviewer_id.name}
        </AppText>
      </ReviewerContainer>
    </Container>
  );
}
