import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
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

            tabBarLabelStyle: { fontSize: 14 },
            tabBarIcon: (tabInfo) => (
              <Entypo
                name="home"
                size={24}
                color={
                  tabInfo.focused
                    ? theme.colors.primary
                    : theme.colors.primary_dark
                }
              />
            ),
          }}
        />
        <Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Dashboard",
            tabBarActiveTintColor: theme.colors.primary,
            tabBarLabelStyle: { fontSize: 14 },
            tabBarIcon: (tabInfo) => (
              <MaterialIcons
                name="dashboard"
                size={24}
                color={
                  tabInfo.focused
                    ? theme.colors.primary
                    : theme.colors.primary_dark
                }
              />
            ),
          }}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Perfil",
            tabBarActiveTintColor: theme.colors.primary,
            tabBarLabelStyle: { fontSize: 14 },
            tabBarIcon: (tabInfo) => (
              <FontAwesome5
                name="user-alt"
                size={24}
                color={
                  tabInfo.focused
                    ? theme.colors.primary
                    : theme.colors.primary_dark
                }
              />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
