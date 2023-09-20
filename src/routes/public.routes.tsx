import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import OAuthSignIn from "@screens/OAuthSignIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} options={{ title: "Home Screen" }} />
      <Screen
        name="OAuth"
        component={OAuthSignIn}
        options={{ title: "OAuth Login" }}
      />
    </Navigator>
  );
}
