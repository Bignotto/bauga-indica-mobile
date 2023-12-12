import AppText from "@components/AppText";
import { TextInputProps } from "react-native";
import { Mask } from "react-native-mask-input";
import {
  Container,
  InputComponent,
  MaskedInputComponent,
  Wrapper,
} from "./styles";

interface AppInputProps extends TextInputProps {
  label?: string;
  mask?: Mask;
}

export default function AppInput({ label, mask, ...rest }: AppInputProps) {
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
      <Wrapper>
        {mask ? (
          <MaskedInputComponent {...rest} mask={mask} />
        ) : (
          <InputComponent {...rest} />
        )}
      </Wrapper>
    </Container>
  );
}
