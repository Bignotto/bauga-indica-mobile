import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { ColumnWrapper, FormContainer, TwoColumnsWrapper } from "./styles";

import AppImageSelector, { AppImagesList } from "@components/AppImageSelector";
import DateRangeSelector from "@components/DateRangeSelector";
import ServiceCategorySelector from "@components/ServiceCategorySelector";
import { AppError } from "@errors/AppError";
import { IServiceType, useData } from "@hooks/DataContext";
import { useStorage } from "@hooks/StorageContext";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("O anúncio precisa de um título."),
  description: yup.string().required("Descreva seu anúncio."),
  adValue: yup
    .number()
    .required()
    .typeError("Valor inválido.")
    .positive("Valor inválido."),
});

export default function NewServiceAd() {
  const theme = useTheme();
  const {
    getAvailableServiceTypes,
    createServiceAd,
    userProfile,
    updateServiceAdImages,
  } = useData();
  const { upload } = useStorage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      adValue: 0,
    },
  });

  const navigation = useNavigation();

  const [adImages, setAdImages] = useState<AppImagesList[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerTo, setShowDatePickerTo] = useState(false);

  const [validFrom, setValidFrom] = useState<Date | undefined>(new Date());
  const [validTo, setValidTo] = useState<Date | undefined>(
    moment(new Date()).add(14, "days").toDate()
  );

  const [selectedCategory, setSelectedCategory] = useState<
    IServiceType | undefined
  >(undefined);

  const [availableServiceTypes, setAvailableServiceTypes] = useState<
    IServiceType[] | undefined
  >(undefined);

  const [modalOn, setModalOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function loadServiceTypes() {
    try {
      const response = await getAvailableServiceTypes();
      setAvailableServiceTypes(response);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadServiceTypes();
  }, []);

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

  function handleSetDateFrom(dateFrom: Date) {
    setValidFrom(dateFrom);
  }

  function handleSetDateTo(dateTo: Date) {
    setValidTo(dateTo);
  }

  function handleSelected(item: IServiceType) {
    setModalOn(!modalOn);
    setSelectedCategory(item);
  }

  async function onSubmit({ adValue, description, title }: any) {
    if (!selectedCategory)
      return Alert.alert("Selecione uma categoria para o anúncio.");
    if (adImages.length === 0)
      return Alert.alert("Selecione ao menos uma imagem para o seu anúncio.");

    const yesterday = moment(new Date()).add(-1, "days").toDate().getTime();

    if (validFrom && validFrom.getTime() < yesterday)
      return Alert.alert("Data de início não pode ser no passado.");
    if (validTo && validTo.getTime() < validFrom!.getTime())
      return Alert.alert("Data final inválida.");

    try {
      setIsLoading(true);
      const response = await createServiceAd({
        description,
        value: adValue,
        title,
        serviceTypeId: selectedCategory.id,
        validFrom: validFrom ? validFrom : new Date(),
        validTo: validTo ? validTo : new Date(),
        providerId: `${userProfile?.id}`,
      });

      const uploadResponse = await upload(
        adImages.map((image, i) => {
          return {
            name: `${response.id}__${i}`,
            path: image.path,
          };
        })
      );

      if (!uploadResponse)
        return Alert.alert("Ocorreu um erro ao fazer upload das imagens...");

      await updateServiceAdImages(response.id!, uploadResponse);

      navigation.goBack();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSpacer verticalSpace="lg" />
        <AppText>Cadastrar um anúncio de serviço:</AppText>
        <AppText size="sm">Descreva o serviço que deseja anunciar.</AppText>
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
          <AppSpacer verticalSpace="xlg" />
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
          <AppSpacer verticalSpace="xlg" />
          <AppText>Validade do anúncio</AppText>
          <AppText size="sm">Por quanto tempo quer seu anúncio ativo?</AppText>
          <AppSpacer />
          <DateRangeSelector
            dateFromValue={validFrom}
            dateToValue={validTo}
            onSelectFromDate={handleSetDateFrom}
            onSelectToDate={handleSetDateTo}
          />
        </FormContainer>
        <AppSpacer verticalSpace="xlg" />
        <ServiceCategorySelector
          visible={modalOn}
          onRequestClose={() => setModalOn(!modalOn)}
          itens={availableServiceTypes}
          onSelect={handleSelected}
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
        <AppText>Imagens</AppText>
        <AppText size="sm">Selecione até 4 imagens para o seu anúncio.</AppText>
        <AppSpacer verticalSpace="sm" />
        <AppImageSelector
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
          selectedImages={adImages}
        />
        <AppSpacer />
        <TwoColumnsWrapper
          style={{
            gap: 12,
          }}
        >
          <ColumnWrapper>
            <AppButton title="Cancelar" variant="negative" />
          </ColumnWrapper>
          <ColumnWrapper>
            <AppButton
              title="Salvar"
              variant="positive"
              onPress={() => handleSubmit(onSubmit)()}
              isLoading={isLoading}
            />
          </ColumnWrapper>
        </TwoColumnsWrapper>
        <AppSpacer />
      </ScrollView>
    </AppScreenContainer>
  );
}
