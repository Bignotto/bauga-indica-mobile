import AppScreenContainer from "@components/AppScreenContainer";
import ServiceAdCard from "@components/ServiceAdCard";
import { AppError } from "@errors/AppError";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ListRenderItem,
  ViewToken,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

type Params = {
  serviceId: string;
};

type HandleScrollProps = {
  viewableItems: Array<ViewToken>;
};

type ImageItem = {
  id: number;
  imagePath: string;
};

type RenderProps = {
  img: ImageItem;
};

export default function ServiceDetails() {
  const route = useRoute();
  const { serviceId } = route.params as Params;
  const navigation = useNavigation();

  const { getServiceAdById, userProfile } = useData();

  const [isLoading, setIsLoading] = useState(true);

  const [service, setService] = useState<IUserServiceAd>();

  useEffect(() => {
    async function loadService() {
      setIsLoading(true);
      try {
        const response = await getServiceAdById(serviceId);
        setService(response);
        navigation.setOptions({ headerTitle: response?.title });
      } catch (error) {
        if (error instanceof AppError) return Alert.alert(error.message);
        return Alert.alert("erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }
    loadService();
  }, []);

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
    <AppScreenContainer
      header={
        isLoading ? (
          <ActivityIndicator />
        ) : (
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
        )
      }
    >
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ServiceAdCard item={service!} buttonType="contact" />
        )}
      </ScrollView>
    </AppScreenContainer>
  );
}
