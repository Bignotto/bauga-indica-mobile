import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import ImageSelector, { AppImagesList } from "./ImageSelector";
import {
  ColumnWrapper,
  DatePickerWrapper,
  FormContainer,
  TwoColumnsWrapper,
} from "./styles";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ServiceCategorySelector, {
  ServiceCategoryItem,
} from "./ServiceCategorySelector";

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      adValue: 0,
    },
  });

  const [adImages, setAdImages] = useState<AppImagesList[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerTo, setShowDatePickerTo] = useState(false);

  const [validFrom, setValidFrom] = useState<Date | undefined>(new Date());
  const [validTo, setValidTo] = useState<Date | undefined>(
    moment(new Date()).add(14, "days").toDate()
  );

  const [modalOn, setModalOn] = useState(false);

  function handleAddImage(imagePath: string) {
    const newImage: AppImagesList = {
      id: imagePath,
      path: imagePath,
      local: true,
    };

    setAdImages([...adImages, newImage]);
  }

  function onChangeValidFrom(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePicker(false);
    setValidFrom(selectedDate);
  }

  function onChangeValidTo(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePickerTo(false);
    setValidTo(selectedDate);
  }

  async function onSubmit({ adValue, description, title }: any) {
    console.log({ adValue, description, title });
  }

  function handleSelected(item: ServiceCategoryItem) {
    setModalOn(!modalOn);
    console.log({ item });
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
                multiline
                numberOfLines={4}
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
                error={errors.adValue?.message}
              />
            )}
            name="adValue"
          />
          <AppSpacer verticalSpace="xlg" />
          <AppText>Validade do anúncio</AppText>
          <AppText size="sm">Por quanto tempo quer seu anúncio ativo?</AppText>
          <AppSpacer />
          <TwoColumnsWrapper>
            <AppInput
              label="Válido de"
              editable={false}
              value={`${moment(validFrom).format("DD/MM/yyyy")}`}
            />
            <DatePickerWrapper>
              <AppButton
                title=""
                onPress={() => setShowDatePicker(true)}
                outline
                leftIcon={
                  <>
                    <AppSpacer />
                    <AntDesign
                      name="calendar"
                      size={24}
                      color={theme.colors.primary}
                    />
                    <AppSpacer />
                  </>
                }
              />
              {showDatePicker && (
                <DateTimePicker
                  value={validFrom ?? new Date()}
                  onChange={onChangeValidFrom}
                />
              )}
            </DatePickerWrapper>
            <AppSpacer />
            <AppInput
              label="Válido até"
              editable={false}
              value={`${moment(validTo).format("DD/MM/yyyy")}`}
            />
            <DatePickerWrapper>
              <AppButton
                title=""
                onPress={() => setShowDatePickerTo(true)}
                outline
                leftIcon={
                  <>
                    <AppSpacer />
                    <AntDesign
                      name="calendar"
                      size={24}
                      color={theme.colors.primary}
                    />
                    <AppSpacer />
                  </>
                }
              />
              {showDatePickerTo && (
                <DateTimePicker
                  value={validTo ?? new Date()}
                  onChange={onChangeValidTo}
                />
              )}
            </DatePickerWrapper>
          </TwoColumnsWrapper>
        </FormContainer>
        <AppSpacer verticalSpace="xlg" />
        <ServiceCategorySelector
          visible={modalOn}
          onRequestClose={() => setModalOn(!modalOn)}
          itens={[
            {
              id: "adsfkjahsdf",
              title: "something",
            },
            { id: "dkjçlakjdf", title: `jardinagem` },
            { id: "adfasdfsdf", title: `construção` },
            { id: "xcvxcvsdfs", title: `elétrica` },
            { id: "vxcvxcvx", title: `encanamentos` },
            { id: "asdasdasd", title: `diaristas` },
            { id: "erwerwsadsf", title: `pintura` },
            { id: "werwerwer", title: `dedetização` },
            { id: "sdfsf", title: `marcenaria` },
            { id: "werwer", title: `limpeza` },
          ]}
          onClose={handleSelected}
          // onRequestClose={() => setModalOn(!modalOn)}
        />
        <AppButton
          title={`select ${modalOn}`}
          onPress={() => {
            setModalOn(true);
          }}
        />
        <AppSpacer verticalSpace="xlg" />
        <AppText>Imagens</AppText>
        <AppText size="sm">Selecione até 4 imagens para o seu anúncio.</AppText>
        <AppSpacer verticalSpace="sm" />
        <ImageSelector
          onAddImage={handleAddImage}
          onRemoveImage={() => {}}
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
            />
          </ColumnWrapper>
        </TwoColumnsWrapper>
        <AppSpacer />
      </ScrollView>
    </AppScreenContainer>
  );
}
