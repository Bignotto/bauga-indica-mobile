import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React from "react";

type Params = {
  serviceId: string;
};

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId } = route.params as Params;

  return (
    <AppScreenContainer>
      <AppText>Service id {serviceId}</AppText>
    </AppScreenContainer>
  );
}
