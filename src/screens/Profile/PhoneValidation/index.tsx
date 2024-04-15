import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { usePhoneVerification } from "@hooks/PhoneVrifyHook";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useState } from "react";
import { Alert } from "react-native";

type Params = {
  phone: string;
};

//NEXT: fix phone validation return from backend
export default function PhoneValidation() {
  const route = useRoute();
  const { phone } = route.params as Params;

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { verifyOtp } = usePhoneVerification();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string>();

  async function handleValidateNumber() {
    if (otp.length !== 6) setOtpError("Código precisa ter 6 dígitos");
    else setOtpError("");

    try {
      const response = await verifyOtp(otp, phone);
      if (response) navigation.reset({ routes: [{ name: "Home" }] });

      return Alert.alert(
        "Algo errado.",
        "Algo errado validando o código. Aguarde alguns minutos e tente novamente."
      );
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(error.message);

      return Alert.alert(JSON.stringify(error, null, 2));
    }
  }

  return (
    <AppScreenContainer>
      <AppSpacer verticalSpace="xlg" />
      <AppText>Enviamos um SMS para o número que você informou.</AppText>
      <AppSpacer verticalSpace="xlg" />
      <AppInput
        keyboardType="number-pad"
        label="Código:"
        placeholder="Informe o código que recebeu"
        value={otp}
        onChangeText={(text) => setOtp(text)}
        error={otpError}
      />
      <AppSpacer verticalSpace="xlg" />
      <AppButton
        title="Validar número de telefone"
        onPress={handleValidateNumber}
      />
    </AppScreenContainer>
  );
}
