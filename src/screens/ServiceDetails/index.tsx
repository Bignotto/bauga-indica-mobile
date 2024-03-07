import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppTag from "@components/AppTag";
import AppText from "@components/AppText";
import ReviewCard from "@components/ReviewCard";
import { AppError } from "@errors/AppError";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ListRenderItem,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ReviewScoreCard from "./ReviewScoreCard";

type Params = {
  serviceId: string;
};

// type HandleScrollProps = {
//   viewableItems: Array<ViewToken>;
// };

type ImageItem = {
  id: number;
  imagePath: string;
};

// type RenderProps = {
//   img: ImageItem;
// };

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId } = route.params as Params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { getServiceAdById, userProfile } = useData();
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

  function handleContact() {
    userProfile && service
      ? navigation.navigate("NewContract", { service })
      : navigation.navigate("SignIn");
  }

  const renderItem: ListRenderItem<ImageItem> = ({ item }) => {
    return (
      <Image
        source={{
          uri: item.imagePath,
        }}
        width={Dimensions.get("window").width}
        height={280}
        resizeMode="cover"
      />
    );
  };

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
            <FlatList
              horizontal
              decelerationRate={"fast"}
              snapToInterval={Dimensions.get("window").width}
              // onViewableItemsChanged={({ viewableItems }: HandleScrollProps) =>
              //   console.log({ viewableItems })
              // }
              data={service?.service_images}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderItem}
            />
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
              <AppButton
                title="Entrar em contato!"
                variant="positive"
                onPress={handleContact}
              />
              <AppSpacer />
            </>
          )
        )}
      </ScrollView>
    </AppScreenContainer>
  );
}
