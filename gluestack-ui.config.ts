// gluestack-ui.config.ts
import { createConfig, config as defaultConfig } from "@gluestack-ui/themed";

export const config = createConfig({
  ...defaultConfig.theme,
  aliases: {
    ...defaultConfig.theme.aliases,
    jc: "justifyContent",
  },
  tokens: {
    ...defaultConfig.theme.tokens,
    fonts: {
      heading: "RobotoSlab_700Bold",
      body: "RobotoSlab_400Regular",
      mono: "monospace",
    },
  },
});

// Get the type of Config
type ConfigType = typeof config;

// Extend the internal ui config
declare module "@gluestack-ui/themed" {
  interface UIConfig extends ConfigType {}
}
