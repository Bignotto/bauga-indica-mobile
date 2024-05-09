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
        width={Dimensions.get("window").width - 20}
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

  const imageIndexWidth = (Dimensions.get("window").width - 4) / images.length;

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width - 20}
        onViewableItemsChanged={onViewChangeCallback}
        // onViewableItemsChanged={({ viewableItems }: HandleScrollProps) =>
        //   console.log({ viewableItems })
        // }
        data={images}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          //NEXT: fix indicator style and snap position
          images.map((img, i) => (
            <IndexIndicator
              key={img.id}
              left={imageIndexWidth * i}
              indexWidth={imageIndexWidth - 50}
              highlight={i === viewIndex}
            />
          ))
        }
      </View>
    </View>
  );
}
