import AppButton from "@components/AppButton";
import AppLogo from "@components/AppLogo";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { HeaderWrapper, ScreenContainer } from "./styles";

type Params = {
  searchText: string;
};

export default function SearchResults() {
  const route = useRoute();
  const { searchText } = route.params as Params;

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <AppLogo size="sm" />
      </HeaderWrapper>
      <AppButton title={searchText} />
    </ScreenContainer>
  );
}
