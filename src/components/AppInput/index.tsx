import AppText from "@components/AppText";
import { TextInputProps } from "react-native";
import { Mask } from "react-native-mask-input";
import { useTheme } from "styled-components";
import {
  Container,
  InputComponent,
  MaskedInputComponent,
  Wrapper,
} from "./styles";

interface AppInputProps extends TextInputProps {
  label?: string;
  mask?: Mask;
  error?: string | undefined;
}

export default function AppInput({
  label,
  mask,
  error,
  ...rest
}: AppInputProps) {
  const theme = useTheme();

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
      <Wrapper error={error}>
        {mask ? (
          <MaskedInputComponent {...rest} mask={mask} />
        ) : (
          <InputComponent {...rest} />
        )}
      </Wrapper>
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
