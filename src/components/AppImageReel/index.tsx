import React from "react";
import { Dimensions, Image, ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface AppImageReelProps {
  images:
    | {
        id: number;
        imagePath: string;
      }[]
    | undefined;
}

type ImageItem = {
  id: number;
  imagePath: string;
};

export default function AppImageReel({ images }: AppImageReelProps) {
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

  //NEXT: implement image counter

  return (
    <FlatList
      horizontal
      decelerationRate={"fast"}
      snapToInterval={Dimensions.get("window").width - 16}
      // onViewableItemsChanged={({ viewableItems }: HandleScrollProps) =>
      //   console.log({ viewableItems })
      // }
      data={images}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
    />
  );
}
