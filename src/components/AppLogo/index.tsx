import { AntDesign } from "@expo/vector-icons";
import { Container, Text } from "./styled";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function AppLogo({ size = "md" }: AppLogoProps) {
  const boxSize = size === "lg" ? 70 : size === "md" ? 44 : 18;
  const fontSize = size === "lg" ? "6xl" : size === "md" ? "4xl" : "2xl";
  const iconSize = size === "lg" ? 100 : size === "md" ? 60 : 30;
  const lineHeight = size === "lg" ? 60 : size === "md" ? 40 : undefined;

  return (
    <Container>
      <Text>Bauga Indica</Text>
      <AntDesign name="like2" size={iconSize} color="#404040" />
    </Container>
  );

  /*
  return (
    <Box flexDirection="row" alignItems="center">
      <Text
        fontFamily="RobotoSlab_700Bold"
        size={fontSize}
        lineHeight={lineHeight}
      >
        Bauga{size === "sm" ? ` ` : `\n`}Indica
      </Text>
      <AntDesign name="like2" size={iconSize} color="#404040" />
    </Box>
  );
  */
}
