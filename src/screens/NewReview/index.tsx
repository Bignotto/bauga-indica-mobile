import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { FontAwesome } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";
import { ProviderInfoContainer, StarsContainer } from "./styles";

type Params = {
  service: IUserServiceAd;
};

const validationSchema = yup.object({
  title: yup.string().required("Toda avaliação precisa de um título."),
  text: yup.string().min(20, "Avaliação precisa de pelo menos 20 caracteres."),
});

export default function NewReview() {
  const route = useRoute();
  const { service } = route.params as Params;

  const { createNewReview, userProfile } = useData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [rate, setRate] = useState(0);

  function handleClickRate(value: number) {
    value === rate ? setRate(0) : setRate(value);
  }

  async function onSubmit({ title, text }: any) {
    try {
      const response = await createNewReview({
        review_date: new Date(),
        score: rate,
        title,
        text,
        service_id: service.id,
        reviewer_id: userProfile?.id,
      });

      navigation.reset({ routes: [{ name: "Home" }] });
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(error.message);

      return Alert.alert("Erro no servidor");
    }
  }

  return (
    <AppScreenContainer>
      <ScrollView>
        <AppSpacer />
        <AppText>Escreva uma avaliação para:</AppText>
        <AppSpacer />
        <AppText size="lg" bold>
          {service.title}
        </AppText>
        <ProviderInfoContainer>
          <AppAvatar size={24} imagePath={`${service.providerId?.image}`} />
          <AppText>{service.providerId?.name}</AppText>
        </ProviderInfoContainer>
        <AppSpacer verticalSpace="xlg" />
        <AppText>Nota:</AppText>
        <StarsContainer>
          <RectButton onPress={() => handleClickRate(1)}>
            {rate >= 1 ? (
              <FontAwesome name="star" size={54} color="gold" />
            ) : (
              <FontAwesome name="star-o" size={54} color="gold" />
            )}
          </RectButton>
          <RectButton onPress={() => handleClickRate(2)}>
            {rate >= 2 ? (
              <FontAwesome name="star" size={54} color="gold" />
            ) : (
              <FontAwesome name="star-o" size={54} color="gold" />
            )}
          </RectButton>
          <RectButton onPress={() => handleClickRate(3)}>
            {rate >= 3 ? (
              <FontAwesome name="star" size={54} color="gold" />
            ) : (
              <FontAwesome name="star-o" size={54} color="gold" />
            )}
          </RectButton>
          <RectButton onPress={() => handleClickRate(4)}>
            {rate >= 4 ? (
              <FontAwesome name="star" size={54} color="gold" />
            ) : (
              <FontAwesome name="star-o" size={54} color="gold" />
            )}
          </RectButton>
          <RectButton onPress={() => handleClickRate(5)}>
            {rate >= 5 ? (
              <FontAwesome name="star" size={54} color="gold" />
            ) : (
              <FontAwesome name="star-o" size={54} color="gold" />
            )}
          </RectButton>
        </StarsContainer>
        <AppSpacer />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              label="Título"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.title?.message}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Avaliação"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              error={errors.text?.message}
            />
          )}
          name="text"
        />
        <AppButton
          title="Enviar avaliação"
          variant="positive"
          onPress={() => handleSubmit(onSubmit)()}
        />
        <AppSpacer />
        <AppButton title="Cancelar" variant="negative" outline />
      </ScrollView>
    </AppScreenContainer>
  );
}
