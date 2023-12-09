import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { AppLogoStyleProps, AppLogoText, Container } from "./styled";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

export default function AppLogo({ size, ...rest }: AppLogoStyleProps) {
  const iconSize = size === "lg" ? 100 : size === "md" ? 54 : 24;

  const theme = useTheme();

  const APP_NAME = `Bauga${size === "sm" ? " " : `\n`}Indica`;

  return (
    <Container>
      <AppLogoText size={size} {...rest}>
        {APP_NAME}
      </AppLogoText>
      <AntDesign name="like2" size={iconSize} color={theme.colors.text} />
    </Container>
  );
}
