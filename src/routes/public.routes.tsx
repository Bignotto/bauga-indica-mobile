import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import SearchResults from "@screens/SearchResults";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import CreateAccount from "@screens/SignUp/CreateAccount";

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
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="CreateAccount" component={CreateAccount} />
    </Navigator>
  );
}
