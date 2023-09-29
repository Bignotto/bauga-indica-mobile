import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "@screens/Dashboard";
import Profile from "@screens/Profile/indext";
import { useTheme } from "styled-components";
import { PublicRoutes } from "./public.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export default function Routes() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name="Start"
          component={PublicRoutes}
          options={{
            tabBarLabel: "Início",
            tabBarActiveTintColor: theme.colors.primary,
            tabBarIcon: (tabInfo) => (
              <Entypo
                name="home"
                size={24}
                color={
                  tabInfo.focused
                    ? theme.colors.primary_dark
                    : theme.colors.primary_light
                }
              />
            ),
          }}
        />
        <Screen name="Dashboard" component={Dashboard} />
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
}
