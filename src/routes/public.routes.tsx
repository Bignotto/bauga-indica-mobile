import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import OAuthSignIn from "@screens/OAuthSignIn";
import SearchResults from "@screens/SearchResults";

const { Navigator, Screen } = createNativeStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Search" component={SearchResults} />
      <Screen name="OAuth" component={OAuthSignIn} />
    </Navigator>
  );
}
