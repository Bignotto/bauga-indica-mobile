import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import NewContract from "@screens/NewContract";
import SearchResults from "@screens/SearchResults";
import ServiceDetails from "@screens/ServiceDetails";
import SignIn from "@screens/SignIn";

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
      <Screen name="ServiceDetails" component={ServiceDetails} />
      <Screen name="NewContract" component={NewContract} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
