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
        width={Dimensions.get("window").width - 16}
        height={280}
        resizeMode="cover"
      />
    );
  };

  const onViewChangeCallback = useCallback(
    ({ viewableItems }: HandleScrollProps) => {
      setViewIndex(viewableItems[0].index ?? 0);
      console.log(viewableItems[0].index ?? 0);
    },
    []
  );

  //NEXT: implement image counter

  if (!images) return <AppText>Algo errado com as imagens</AppText>;

  const imageIndexWidth = (Dimensions.get("window").width - 4) / images.length;

  return (
    <View>
      <FlatList
        horizontal
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width - 16}
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          //NEXT: fix indicator position
          images.map((img, i) => (
            <IndexIndicator
              key={img.id}
              indexWidth={imageIndexWidth * i}
              highlight={i === viewIndex}
            />
          ))
        }
      </View>
    </View>
  );
}
