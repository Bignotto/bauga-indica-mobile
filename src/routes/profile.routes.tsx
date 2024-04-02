import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@screens/Profile";
import PhoneValidation from "@screens/Profile/PhoneValidation";

const { Navigator, Screen } = createNativeStackNavigator();

export function ProfileRoutes() {
  return (
    <Navigator>
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="PhoneValidation"
        component={PhoneValidation}
        options={{
          headerTitle: "Validação do telefone",
        }}
      />
    </Navigator>
  );
}
