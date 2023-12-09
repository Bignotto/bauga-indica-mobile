import "styled-components/native";
import DefaultTheme from "./DefaultTheme";

declare module "styled-components" {
  type ThemeType = typeof DefaultTheme;
  export interface DefaultTheme extends ThemeType {}
}
