import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import OAuthSignIn from "@screens/OAuthSignIn";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name="Google"
          component={OAuthSignIn}
          options={{ title: "OAuth Login" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
