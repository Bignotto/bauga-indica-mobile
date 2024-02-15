import Header from "@components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import NewContract from "@screens/NewContract";
import ContractCreated from "@screens/NewContract/ContractCreated";
import SearchResults from "@screens/SearchResults";
import ServiceDetails from "@screens/ServiceDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export function SearchRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      // screenOptions={{
      //   header: (props) => <Header />,
      // }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          header: (props) => <Header />,
        }}
      />
      <Screen
        name="Search"
        component={SearchResults}
        options={{
          headerTitle: "Encontrar serviço",
        }}
      />
      <Screen name="ServiceDetails" component={ServiceDetails} />
      <Screen
        name="NewContract"
        component={NewContract}
        options={{
          headerTitle: "Contratar serviço",
        }}
      />
      <Screen
        name="ContractCreated"
        component={ContractCreated}
        options={{
          headerShown: false,
        }}
      />
      {/* <Screen name="ReviewService" component={ReviwService} /> */}
    </Navigator>
  );
}
