import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppSpacer from "@components/AppSpacer";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import { DatePickerWrapper, TwoColumnsWrapper } from "./styles";

interface DateRangeSelector {}

export default function DateRangeSelector() {
  const theme = useTheme();

  const [validFrom, setValidFrom] = useState<Date | undefined>();
  const [validTo, setValidTo] = useState<Date | undefined>();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerTo, setShowDatePickerTo] = useState(false);

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
  );
}
