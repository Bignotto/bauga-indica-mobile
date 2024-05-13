import AppText from "@components/AppText";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  View,
  ViewToken,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IndexIndicator } from "./styles";

type ImageItem = {
  id: number;
  imagePath: string;
};

interface AppImageReelProps {
  images: ImageItem[] | undefined;
}

type HandleScrollProps = {
  viewableItems: Array<ViewToken>;
};

export default function AppImageReel({ images }: AppImageReelProps) {
  const [viewIndex, setViewIndex] = useState(0);

  const renderItem: ListRenderItem<ImageItem> = ({ item }) => {
    return (
      <Image
        source={{
          uri: item.imagePath,
        }}
        width={Dimensions.get("window").width - 32}
        height={280}
        resizeMode="cover"
      />
    );
  };

  const onViewChangeCallback = useCallback(
    ({ viewableItems }: HandleScrollProps) => {
      setViewIndex(viewableItems[0].index ?? 0);
    },
    []
  );

  if (!images) return <AppText>Algo errado com as imagens</AppText>;

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width - 28}
        onViewableItemsChanged={onViewChangeCallback}
        data={images}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {images.map((img, i) => (
          <IndexIndicator key={img.id} highlight={i === viewIndex} />
        ))}
      </View>
    </View>
  );
}
