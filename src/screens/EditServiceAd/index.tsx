import AppImageSelector, { AppImagesList } from "@components/AppImageSelector";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import DateRangeSelector from "@components/DateRangeSelector";
import { AppError } from "@errors/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserServiceAd, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";
import { FormContainer } from "./styles";

type Params = {
  serviceAdId: string;
};

const validationSchema = yup.object({
  title: yup.string().required("O anúncio precisa de um título."),
  description: yup.string().required("Descreva seu anúncio."),
  adValue: yup
    .number()
    .required()
    .typeError("Valor inválido.")
    .positive("Valor inválido."),
});

export default function EditServiceAd() {
  const route = useRoute();
  const { serviceAdId } = route.params as Params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      adValue: 0,
    },
  });

  const [service, setService] = useState<IUserServiceAd>();
  const [adImages, setAdImages] = useState<AppImagesList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const { getServiceAdById } = useData();

  useEffect(() => {
    async function loadServiceAd() {
      setIsLoading(true);
      try {
        const response = await getServiceAdById(serviceAdId);

        setService(response);

        setValue("title", `${response?.title}`);
        setValue("description", `${response?.description}`);
        setValue("adValue", response?.value ?? 0);

        const images: AppImagesList[] =
          response && response.service_images
            ? response?.service_images?.map((img) => {
                const i: AppImagesList = {
                  id: `${img.id}`,
                  path: img.imagePath,
                  local: false,
                };
                return i;
              })
            : [];

        setAdImages(images);
      } catch (error) {
        if (error instanceof AppError) return Alert.alert(error.message);
        return Alert.alert("erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    loadServiceAd();
  }, []);

  function handleSetDateFrom(dateFrom: Date) {
    setDateFrom(dateFrom);
  }

  function handleSetDateTo(dateTo: Date) {
    setDateTo(dateTo);
  }

  function handleAddImage(imagePath: string) {
    const newImage: AppImagesList = {
      id: imagePath,
      path: imagePath,
      local: true,
    };

    setAdImages([...adImages, newImage]);
  }

  function handleRemoveImage(imagePath: string) {
    const filteredImages = adImages.filter((image) => imagePath !== image.path);
    setAdImages(filteredImages);
  }

  return (
    <AppScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSpacer />
        <FormContainer>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Título do anúncio"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.title?.message}
              />
            )}
            name="title"
          />
          <AppSpacer />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Descrição do anúncio"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                error={errors.description?.message}
              />
            )}
            name="description"
          />
          <AppSpacer />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={`${value}`}
                label="Valor"
                keyboardType="decimal-pad"
                error={errors.adValue?.message}
              />
            )}
            name="adValue"
          />
        </FormContainer>

        <AppSpacer />
        <DateRangeSelector
          onSelectFromDate={handleSetDateFrom}
          onSelectToDate={handleSetDateTo}
          dateFromValue={dateFrom}
          dateToValue={dateTo}
        />
        <AppSpacer />

        <AppImageSelector
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
          selectedImages={adImages}
        />
      </ScrollView>
    </AppScreenContainer>
  );
}
