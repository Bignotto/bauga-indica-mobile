import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContractDetails from "@screens/ContractDetails";
import Dashboard from "@screens/Dashboard";
import EditServiceAd from "@screens/EditServiceAd";
import NewServiceAd from "@screens/NewServiceAd";
import UserContractedServices from "@screens/UserContractedServices";
import UserProvidedServices from "@screens/UserProvidedServices";
import UserServiceAds from "@screens/UserServiceAds";

const { Navigator, Screen } = createNativeStackNavigator();

export function DashboardRoutes() {
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
        }}
      />
      <Screen
        name="UserServiceAds"
        options={{
          title: "Meus serviços anunciados",
        }}
        component={UserServiceAds}
      />
      <Screen
        name="UserContractedServices"
        options={{
          title: "Meus serviços contratados",
        }}
        component={UserContractedServices}
      />
      <Screen
        name="UserProvidedServices"
        options={{
          title: "Serviços prestados",
        }}
        component={UserProvidedServices}
      />
      <Screen
        name="NewServiceAd"
        component={NewServiceAd}
        options={{
          title: "Novo anúncio de serviço",
        }}
      />
      <Screen
        name="ContractDetails"
        component={ContractDetails}
        options={{
          title: "Detalhes do contrato",
        }}
      />
      <Screen
        name="EditServiceAd"
        component={EditServiceAd}
        options={{
          title: "Editar anúncio",
        }}
      />
    </Navigator>
  );
}
