import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import ImageSelector, { AppImagesList } from "./ImageSelector";
import { DatePickerWrapper, FormContainer, TwoColumnsWrapper } from "./styles";

export default function NewServiceAd() {
  const theme = useTheme();

  const [adImages, setAdImages] = useState<AppImagesList[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerTo, setShowDatePickerTo] = useState(false);

  const [validFrom, setValidFrom] = useState<Date | undefined>(new Date());
  const [validTo, setValidTo] = useState<Date | undefined>(
    moment(new Date()).add(14, "days").toDate()
  );

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
          <AppText size="sm">Por quanto tempo quer seu anúncio ativo?</AppText>
          <AppSpacer />
          <TwoColumnsWrapper>
            <DatePickerWrapper>
              <AppInput
                label="Válido de"
                editable={false}
                value={`${moment(validFrom).format("DD/MM/yyyy")}`}
              />
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
            <DatePickerWrapper>
              <AppInput
                label="Válido até"
                editable={false}
                value={`${moment(validTo).format("DD/MM/yyyy")}`}
              />
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
        <ImageSelector
          onAddImage={handleAddImage}
          onRemoveImage={() => {}}
          selectedImages={adImages}
        />
      </ScrollView>
    </AppScreenContainer>
  );
}
