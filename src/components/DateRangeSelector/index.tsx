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

interface DateRangeSelectorProps {
  onSelectFromDate(dateFrom: Date): void;
  onSelectToDate(dateTo: Date): void;
  dateFromValue: Date | undefined;
  dateToValue: Date | undefined;
}

export default function DateRangeSelector({
  onSelectFromDate,
  onSelectToDate,
  dateFromValue,
  dateToValue,
}: DateRangeSelectorProps) {
  const theme = useTheme();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerTo, setShowDatePickerTo] = useState(false);

  function onChangeValidFrom(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePicker(false);
    if (selectedDate) onSelectFromDate(selectedDate);
  }

  function onChangeValidTo(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePickerTo(false);
    if (selectedDate) onSelectToDate(selectedDate);
  }

  return (
    <TwoColumnsWrapper>
      <AppInput
        label="Válido de"
        editable={false}
        value={`${moment(dateFromValue).format("DD/MM/yyyy")}`}
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
            value={dateFromValue ?? new Date()}
            onChange={onChangeValidFrom}
          />
        )}
      </DatePickerWrapper>
      <AppSpacer />
      <AppInput
        label="Válido até"
        editable={false}
        value={`${moment(dateToValue).format("DD/MM/yyyy")}`}
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
            value={dateToValue ?? new Date()}
            onChange={onChangeValidTo}
          />
        )}
      </DatePickerWrapper>
    </TwoColumnsWrapper>
  );
}
