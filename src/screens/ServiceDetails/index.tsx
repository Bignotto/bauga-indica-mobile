import AppButton from "@components/AppButton";
import AppImageReel from "@components/AppImageReel";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppTag from "@components/AppTag";
import AppText from "@components/AppText";
import ReviewCard from "@components/ReviewCard";
import { AppError } from "@errors/AppError";
import { FontAwesome5 } from "@expo/vector-icons";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReviewScoreCard from "./ReviewScoreCard";

type Params = {
  serviceId: string;
  searchTerm?: string;
};

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId, searchTerm } = route.params as Params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { getServiceAdById, userProfile, activityLog } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<IUserServiceAd>();

  useEffect(() => {
    async function loadService() {
      setIsLoading(true);

      try {
        const response = await getServiceAdById(serviceId);
        setService(response);
        //navigation.setOptions({ headerTitle: response?.title });
      } catch (error) {
        if (error instanceof AppError) return Alert.alert(error.message);
        return Alert.alert("erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    loadService();
  }, []);

  const reviews = service && service.reviews;

  const serviceScore = reviews?.reduce((acc, review) => acc + review.score, 0);

  // commented to deal with contracts in later versions
  // function handleContact() {
  //   userProfile && service
  //     ? navigation.navigate("NewContract", { service })
  //     : navigation.navigate("SignIn");
  // }

  function handleReview() {
    userProfile && service
      ? navigation.navigate("NewReview", { service })
      : navigation.navigate("SignIn");
  }

  //TODO: include searched text to contact logging
  async function handleContact() {
    await activityLog({
      event: "contact",
      subject: `${service?.id}`,
      user_provider: service?.providerId?.id,
      data: searchTerm,
    });

    userProfile && service
      ? Linking.openURL(
          `whatsapp://send?text=Olá ${service.providerId?.name}! Encontrei seu contato no Bauga Indica. Gostaria de um orçamento para o serviço ${service.title}&phone=+55${service.providerId?.phone}`
        )
      : navigation.navigate("SignIn");
  }

  return (
    <AppScreenContainer>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <AppTag>{service?.serviceTypeId?.name}</AppTag>
            <AppText bold size="xlg">
              {service?.title}
            </AppText>
            <ReviewScoreCard
              score={serviceScore ?? 0}
              reviewCount={reviews?.length ?? 0}
            />
            <AppText>{service?.description}</AppText>
            <AppSpacer verticalSpace="lg" />
            <AppImageReel images={service?.service_images} />
          </>
        )}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          reviews && (
            <>
              <AppSpacer />
              <AppText bold size="lg">
                Avaliações
              </AppText>
              <AppSpacer />
              {reviews.length === 0 ? (
                <>
                  <AppText size="sm">
                    Este serviço ainda não foi avaliado.
                  </AppText>
                  <AppSpacer />
                </>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
              <AppSpacer />
              <AppButton
                title="Entrar em contato"
                variant="positive"
                leftIcon={
                  <FontAwesome5 name="whatsapp" size={24} color="white" />
                }
                onPress={handleContact}
              />
              <AppSpacer />
              <AppButton
                title="Escrever uma avaliação"
                variant="positive"
                outline
                leftIcon={
                  <FontAwesome5 name="whatsapp" size={24} color="white" />
                }
                onPress={handleReview}
              />
            </>
          )
        )}
      </ScrollView>
    </AppScreenContainer>
  );
}
