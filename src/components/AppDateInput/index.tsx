import AppText from "@components/AppText";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, InputComponent, Wrapper } from "./styles";

interface AppDateInputProps extends TextInputProps {
  label?: string;
  error?: string | undefined;
  dateValue?: Date;
  onChangeDate(date: Date | undefined): void;
}

export default function AppDateInput({
  label,
  error,
  dateValue,
  onChangeDate,
  ...rest
}: AppDateInputProps) {
  const theme = useTheme();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [theDate, setTheDate] = useState<Date>();

  function onChangeDateValue(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePicker(false);
    onChangeDate(selectedDate);
  }

  return (
    <Container>
      {label && (
        <AppText
          size="sm"
          style={{
            marginBottom: 4,
          }}
        >
          {label}
        </AppText>
      )}
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Wrapper error={error}>
          <InputComponent editable={false} {...rest} />
          <FontAwesome5
            name="calendar-alt"
            size={24}
            color={theme.colors.text_gray}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dateValue ?? new Date()}
              onChange={onChangeDateValue}
            />
          )}
        </Wrapper>
      </Pressable>
      {error ? (
        <AppText size="xsm" color={theme.colors.negative}>
          {error}
        </AppText>
      ) : (
        <AppText size="xsm"> </AppText>
      )}
    </Container>
  );
}
