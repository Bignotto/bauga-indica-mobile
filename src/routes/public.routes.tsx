import Header from "@components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import SearchResults from "@screens/SearchResults";
import ServiceDetails from "@screens/ServiceDetails";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import CreateAccount from "@screens/SignUp/CreateAccount";

const { Navigator, Screen } = createNativeStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <Header />,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Search" component={SearchResults} />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Screen name="CreateAccount" component={CreateAccount} />
      <Screen name="ServiceDetails" component={ServiceDetails} />
    </Navigator>
  );
}
