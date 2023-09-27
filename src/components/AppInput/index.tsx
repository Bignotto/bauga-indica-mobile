import AppText from "@components/AppText";
import { TextInputProps } from "react-native";
import { Container, InputComponent, Wrapper } from "./styles";

interface AppInputProps extends TextInputProps {
  label?: string;
}

export default function AppInput({ label, ...rest }: AppInputProps) {
  return (
    <Container>
      {label && (
        <AppText
          style={{
            marginBottom: 8,
          }}
        >
          {label}
        </AppText>
      )}
      <Wrapper>
        <InputComponent {...rest} />
      </Wrapper>
    </Container>
  );
}
