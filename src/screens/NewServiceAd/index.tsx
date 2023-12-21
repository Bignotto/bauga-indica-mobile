import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { FormContainer } from "./styles";

type AppImagesList = {
  id: string | undefined;
  path: string;
  local: boolean;
};

export default function NewServiceAd() {
  const theme = useTheme();

  const [adImages, setAdImages] = useState<AppImagesList[]>([]);

  const [theImage, setTheImage] = useState("");

  async function handleImageSelect() {
    const selectedImages = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (selectedImages.canceled) return;

    setTheImage(selectedImages.assets[0].uri);

    // const newImage: AppImagesList = {
    //   id: selectedImages.assets[0].uri,
    //   path: selectedImages.assets[0].uri,
    //   local: true,
    // };

    // setAdImages([...adImages, newImage]);
  }

  return (
    <AppScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSpacer verticalSpace="lg" />
        <AppText size="md" bold>
          Cadastrar um anúncio de serviço:
        </AppText>
        <AppSpacer verticalSpace="lg" />
        <AppText size="md">Descreva o serviço que deseja anunciar.</AppText>
        <FormContainer>
          <AppInput label="Título do anúncio" />
          <AppSpacer />
          <AppInput label="Descrição do anúncio" multiline numberOfLines={4} />
          <AppSpacer verticalSpace="xlg" />
          <AppInput label="Valor" />
          <AppSpacer verticalSpace="xlg" />
          <AppText>Validade do anúncio</AppText>
          <AppInput label="Válido de" />
          <AppSpacer />
          <AppInput label="Válido até" />
        </FormContainer>
        <AppSpacer verticalSpace="xlg" />
        <AppButton onPress={handleImageSelect} title="Pick image" />
      </ScrollView>
    </AppScreenContainer>
  );
}
