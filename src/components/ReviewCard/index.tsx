import AppAvatar from "@components/AppAvatar";
import AppText from "@components/AppText";
import React from "react";
import { Container } from "./styles";

export default function ReviewCard() {
  return (
    <Container>
      <AppAvatar
        imagePath="https://qewywwsoggiorjqjupal.supabase.co/storage/v1/object/public/images_avatars/Screenshot%20from%202023-06-24%2006-48-25.png"
        size={28}
      />
      <AppText bold size="md">
        Reviewer Name
      </AppText>
      <AppText>Review Title</AppText>
      <AppText size="sm">25/03/2023</AppText>
      <AppText>
        Review very long text. With multiple lines. And maybe a picture? How
        many lines did we get? Must write a few more words...
      </AppText>
    </Container>
  );
}
