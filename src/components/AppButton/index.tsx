import { RectButtonProps } from "react-native-gesture-handler";
import { ButtonContainer, ButtonText } from "./styles";

type AppButtonProps = RectButtonProps & {
  title: string;
  variant?: "dark" | "solid" | "light";
};

export default function AppButton({
  title,
  variant = "solid",
  ...rest
}: AppButtonProps) {
  return (
    <ButtonContainer {...rest}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}
