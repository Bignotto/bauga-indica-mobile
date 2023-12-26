import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import {
  AdImageAddButton,
  AdImageAddButtonWrapper,
  SelectorContainer,
} from "./styles";

export type AppImagesList = {
  id: string | undefined;
  path: string;
  local: boolean;
};

interface ImageSelectorProps {
  onAddImage(imagePath: string): void;
  onRemoveImage(imagePath: string): void;
  selectedImages: AppImagesList[];
  imageLimit?: number;
}

export default function ImageSelector({
  onAddImage,
  onRemoveImage,
  selectedImages,
  imageLimit = 3,
}: ImageSelectorProps) {
  const theme = useTheme();

  async function handleImageSelect() {
    const selectedImages = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (selectedImages.canceled) return;

    onAddImage(selectedImages.assets[0].uri);
  }

  return (
    <ScrollView horizontal>
      <SelectorContainer>
        {selectedImages.map((image) => (
          <Image
            key={image.id}
            source={{
              uri: image.path,
            }}
            style={{
              height: 164,
              width: 100,
            }}
          />
        ))}

        {selectedImages.length <= imageLimit && (
          <AdImageAddButtonWrapper>
            <AdImageAddButton onPress={handleImageSelect}>
              <Ionicons
                name="add-circle-sharp"
                size={24}
                color={theme.colors.text_disabled}
              />
            </AdImageAddButton>
          </AdImageAddButtonWrapper>
        )}
      </SelectorContainer>
    </ScrollView>
  );
}
