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
  disabled?: boolean;
  onChangeDate(date: Date | undefined): void;
}

export default function AppDateInput({
  label,
  error,
  dateValue,
  disabled = false,
  onChangeDate,
  ...rest
}: AppDateInputProps) {
  const theme = useTheme();

  const [showDatePicker, setShowDatePicker] = useState(false);

  function onChangeDateValue(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePicker(false);
    if (event.type === "dismissed") return;
    if (selectedDate) onChangeDate(selectedDate);
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
      <Pressable onPress={() => setShowDatePicker(true)} disabled={disabled}>
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
