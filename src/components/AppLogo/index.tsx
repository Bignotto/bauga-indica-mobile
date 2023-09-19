import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Container, Text } from "./styled";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function AppLogo({ size = "md" }: AppLogoProps) {
  const boxSize = size === "lg" ? 70 : size === "md" ? 44 : 18;
  const fontSize = size === "lg" ? "6xl" : size === "md" ? "4xl" : "2xl";
  const iconSize = size === "lg" ? 100 : size === "md" ? 60 : 30;
  const lineHeight = size === "lg" ? 60 : size === "md" ? 40 : undefined;

  const theme = useTheme();

  return (
    <Container>
      <Text>Bauga Indica</Text>
      <AntDesign name="like2" size={iconSize} color={theme.colors.text} />
    </Container>
  );
}
