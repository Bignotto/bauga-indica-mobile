import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "@screens/Dashboard";
import NewServiceAd from "@screens/NewServiceAd";
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
        name="NewServiceAd"
        component={NewServiceAd}
        options={{
          title: "Novo anúncio de serviço",
        }}
      />
    </Navigator>
  );
}
