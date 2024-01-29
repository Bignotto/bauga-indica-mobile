import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { View } from "react-native";

export default function ContractCreated() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <AppScreenContainer>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppText>Sua mensagem foi enviada!</AppText>
        <AppText>Aguarde o contato do prestador de serviços.</AppText>
        <AppButton
          title="OK"
          variant="positive"
          onPress={() => navigation.reset({ routes: [{ name: "Home" }] })}
        />
      </View>
    </AppScreenContainer>
  );
}
