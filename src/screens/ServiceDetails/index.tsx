import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScreenContainer } from "./styles";

type Params = {
  serviceId: string;
};

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId } = route.params as Params;

  return (
    <ScreenContainer>
      <AppText>Service id {serviceId}</AppText>
    </ScreenContainer>
  );
}
