import AppButton from "@components/AppButton";
import AppImageSelector, { AppImagesList } from "@components/AppImageSelector";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import DateRangeSelector from "@components/DateRangeSelector";
import ServiceCategorySelector from "@components/ServiceCategorySelector";
import { AppError } from "@errors/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { IServiceType, IUserServiceAd, useData } from "@hooks/DataContext";
import { useStorage } from "@hooks/StorageContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";
import { ButtonColumn, ButtonsWrapper, FormContainer } from "./styles";

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

  const navigation = useNavigation();

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

  const {
    getServiceAdById,
    updateServiceAdImages,
    removeImageFromService,
    updateServiceAd,
    getAvailableServiceTypes,
  } = useData();
  const { upload, remove } = useStorage();

  const [service, setService] = useState<IUserServiceAd>();
  const [adImages, setAdImages] = useState<AppImagesList[]>([]);

  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const [selectedCategory, setSelectedCategory] = useState<
    IServiceType | undefined
  >(undefined);

  const [availableServiceTypes, setAvailableServiceTypes] = useState<
    IServiceType[] | undefined
  >(undefined);

  const [modalOn, setModalOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadServiceAd() {
      setIsLoading(true);
      try {
        const response = await getServiceAdById(serviceAdId);

        if (!response) return Alert.alert("Anúncio não encontrado.");
        setService(response);

        setValue("title", response.title);
        setValue("description", response.description);
        setValue("adValue", response.value);

        setDateFrom(new Date(response.valid_from!));
        setDateTo(new Date(response.valid_to!));

        const images: AppImagesList[] =
          response && response.service_images
            ? response.service_images.map((img) => {
                const i: AppImagesList = {
                  id: `${img.id}`,
                  path: img.imagePath,
                  local: false,
                };
                return i;
              })
            : [];

        setAdImages(images);

        const categories = await getAvailableServiceTypes();
        setAvailableServiceTypes(categories);

        setSelectedCategory(response.serviceTypeId);
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

  async function handleAddImage(imagePath: string) {
    const newImage: AppImagesList = {
      id: imagePath,
      path: imagePath,
      local: true,
    };

    setAdImages([...adImages, newImage]);

    try {
      const uploadResponse = await upload([
        {
          name: `${serviceAdId}__${adImages.length + 1}`,
          path: imagePath,
        },
      ]);
      if (!uploadResponse)
        return Alert.alert("Ocorreu um erro ao fazer upload das imagens...");

      await updateServiceAdImages(serviceAdId, uploadResponse);
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    }
  }

  async function handleRemoveImage(imagePath: string) {
    async function doRemoval() {
      const filteredImages = adImages.filter(
        (image) => imagePath !== image.path
      );
      setAdImages(filteredImages);

      const filename = new URL(imagePath).pathname.split("/").pop();

      try {
        await remove([
          {
            name: `${filename}`,
            path: imagePath,
          },
        ]);

        await removeImageFromService(serviceAdId, imagePath);
      } catch (error) {
        if (error instanceof AppError) {
          return Alert.alert(error.message);
        }
        Alert.alert("Ocorreu um erro desconhecido!");
      }
    }

    await Alert.alert(
      "Remover imagem",
      "Tem certeza que quer remover a imagem?",
      [
        {
          text: "Sim",
          style: "default",
          onPress: doRemoval,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  function handleSelected(item: IServiceType) {
    setModalOn(!modalOn);
    if (!item) return;
    setSelectedCategory(item);
  }

  async function onSubmit({ adValue, description, title }: any) {
    try {
      await updateServiceAd({
        description,
        title,
        validFrom: dateFrom!,
        validTo: dateTo!,
        value: adValue,
        id: serviceAdId,
        serviceTypeId: selectedCategory?.id,
      });

      navigation.goBack();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    }
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
        <AppSpacer verticalSpace="xlg" />
        <ServiceCategorySelector
          visible={modalOn}
          onRequestClose={() => setModalOn(!modalOn)}
          itens={availableServiceTypes}
          onSelect={handleSelected}
          selectedItem={selectedCategory}
        />
        <AppButton
          title={
            selectedCategory
              ? selectedCategory.name
              : "Selecione a categoria do anúncio"
          }
          onPress={() => {
            setModalOn(true);
          }}
          isLoading={isLoading}
        />
        <AppSpacer verticalSpace="xlg" />

        <AppImageSelector
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
          selectedImages={adImages}
        />
        <AppSpacer />
        <ButtonsWrapper>
          <ButtonColumn>
            <AppButton
              title="Cancelar"
              variant="negative"
              onPress={() => navigation.goBack()}
            />
          </ButtonColumn>
          <ButtonColumn>
            <AppButton
              title="Salvar"
              variant="positive"
              onPress={() => handleSubmit(onSubmit)()}
              isLoading={isLoading}
            />
          </ButtonColumn>
        </ButtonsWrapper>
        <AppSpacer />
      </ScrollView>
    </AppScreenContainer>
  );
}
