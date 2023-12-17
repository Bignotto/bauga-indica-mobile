import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "@screens/Dashboard";
import UserServiceAds from "@screens/UserServiceAds";

const { Navigator, Screen } = createNativeStackNavigator();

export function DashboardRoutes() {
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="UserServiceAds" component={UserServiceAds} />
    </Navigator>
  );
}
