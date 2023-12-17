import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useData } from "@hooks/DataContext";
import React from "react";

export default function UserServiceAds() {
  const { getUserServiceAds } = useData();

  async function handleLoad() {
    getUserServiceAds().then((data) =>
      console.log(JSON.stringify(data, null, 2))
    );
  }
  return (
    <AppScreenContainer>
      <AppText>User services list</AppText>

      <AppButton title="load" onPress={handleLoad} />
    </AppScreenContainer>
  );
}
