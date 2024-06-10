import Header from "@components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import ContractCreated from "@screens/NewContract/ContractCreated";
import NewReview from "@screens/NewReview";
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
      <Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          headerTitle: "Detalhes do serviço",
        }}
      />
      {/* <Screen
        name="NewContract"
        component={NewContract}
        options={{
          headerTitle: "Contratar serviço",
        }}
      /> */}
      <Screen
        name="ContractCreated"
        component={ContractCreated}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="NewReview"
        component={NewReview}
        options={{
          headerTitle: "Nova avaliação",
        }}
      />
    </Navigator>
  );
}
