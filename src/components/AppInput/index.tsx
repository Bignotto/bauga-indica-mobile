import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface AppInputProps extends TextInputProps {
  label: string;
}

export default function AppInput({ label, ...rest }: AppInputProps) {
  return <Container {...rest} />;
}
