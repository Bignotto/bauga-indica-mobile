import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React from "react";

type Params = {
  serviceAdId: string;
};

export default function EditServiceAd() {
  const route = useRoute();
  const { serviceAdId } = route.params as Params;

  return (
    <AppScreenContainer>
      <AppText>Edit service add</AppText>
      <AppText>Service ad id: {serviceAdId}</AppText>
    </AppScreenContainer>
  );
}
