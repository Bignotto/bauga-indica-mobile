import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import ServiceAdCard from "@components/ServiceAdCard";
import { AppError } from "@errors/AppError";
import { Entypo } from "@expo/vector-icons";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { TopWrapper } from "./styles";

export default function UserServiceAds() {
  const { getUserServiceAds } = useData();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [adsList, setAdsList] = useState<IUserServiceAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadAdsList() {
    setIsLoading(true);

    try {
      const response = await getUserServiceAds();
      if (response) setAdsList(response);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadAdsList();
  });

  return (
    <AppScreenContainer>
      <AppSpacer />
      <TopWrapper>
        <AppText>Seus anúncios cadastrados</AppText>
        <AppButton
          style={{
            height: 28,
          }}
          outline
          size="sm"
          title="Novo anúncio"
          rightIcon={
            <Entypo name="plus" size={24} color={theme.colors.primary} />
          }
          onPress={() => navigation.navigate("NewServiceAd")}
        />
      </TopWrapper>
      <AppSpacer />
      <ScrollView showsVerticalScrollIndicator={false}>
        {adsList.map((ad) => (
          <ServiceAdCard
            item={ad}
            showDescription={true}
            showProvider={true}
            key={ad.id}
          />
        ))}
      </ScrollView>
    </AppScreenContainer>
  );
}
