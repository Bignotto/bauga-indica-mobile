import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { AppError } from "@errors/AppError";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useData } from "@hooks/DataContext";
import { StorageProvider } from "@hooks/StorageContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components";
import { DashboardRoutes } from "./dashboard.routes";
import { ProfileRoutes } from "./profile.routes";
import { PublicRoutes } from "./public.routes";
import { SearchRoutes } from "./search.routes";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { loadUserProfile, createNewAccount } = useData();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  async function loadProfile() {
    if (!isLoaded) return;
    if (!user) return;
    setIsLoading(true);

    try {
      const loadedProfile = await loadUserProfile(`${user?.id}`);

      if (!loadedProfile) {
        const newProfile = {
          id: `${user?.id}`,
          name: `${user?.fullName}`,
          email: `${user?.primaryEmailAddress?.emailAddress}`,
          image: `${user?.imageUrl}`,
        };
        await createNewAccount(newProfile);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isSignedIn && user) {
      loadProfile();
    }
  }, [isSignedIn, user]);

  return (
    <NavigationContainer>
      <SignedOut>
        <PublicRoutes />
      </SignedOut>
      <SignedIn>
        <StorageProvider>
          <BottomTab.Navigator
            screenOptions={{
              // header: (props) => <Header />,
              headerShown: false,
            }}
          >
            <BottomTab.Screen
              name="Start"
              component={SearchRoutes}
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
                        : theme.colors.text_disabled
                    }
                  />
                ),
              }}
            />
            <BottomTab.Screen
              name="DashboardHome"
              component={DashboardRoutes}
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
                        : theme.colors.text_disabled
                    }
                  />
                ),
              }}
            />
            <BottomTab.Screen
              name="UserProfile"
              component={ProfileRoutes}
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
                        : theme.colors.text_disabled
                    }
                  />
                ),
                headerShown: false,
              }}
            />
          </BottomTab.Navigator>
        </StorageProvider>
      </SignedIn>
    </NavigationContainer>
  );
}
