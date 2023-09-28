import {
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_700Bold,
  RobotoSlab_900Black,
  useFonts,
} from "@expo-google-fonts/roboto-slab";
import Routes from "@routes/index";
import * as SecureStore from "expo-secure-store";

import { ClerkProvider } from "@clerk/clerk-expo";
import { AppAuthProvider } from "@hooks/AppAuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import DefaultTheme from "./src/styles/DefaultTheme";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const CLERK_KEY = `${process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}`;

  let [fontsLoaded, fontError] = useFonts({
    RobotoSlab_300Light,
    RobotoSlab_900Black,
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={DefaultTheme}>
        <ClerkProvider publishableKey={`${CLERK_KEY}`} tokenCache={tokenCache}>
          <AppAuthProvider>
            <Routes />
          </AppAuthProvider>
        </ClerkProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
