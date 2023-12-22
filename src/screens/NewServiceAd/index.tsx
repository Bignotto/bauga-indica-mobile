import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import ImageSelector from "./ImageSelector";
import { FormContainer } from "./styles";

type AppImagesList = {
  id: string | undefined;
  path: string;
  local: boolean;
};

export default function NewServiceAd() {
  const theme = useTheme();

  const [adImages, setAdImages] = useState<AppImagesList[]>([]);

  function onUpdate(imagesList: AppImagesList[]) {
    console.log(JSON.stringify(imagesList, null, 2));
  }

  function handleAddImage(imagePath: string) {
    const newImage: AppImagesList = {
      id: imagePath,
      path: imagePath,
      local: true,
    };

    setAdImages([...adImages, newImage]);
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
        <ImageSelector
          onAddImage={handleAddImage}
          onRemoveImage={() => {}}
          selectedImages={adImages}
        />
      </ScrollView>
    </AppScreenContainer>
  );
}
