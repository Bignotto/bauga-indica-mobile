import { useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { IUserDTO, useData } from "@hooks/DataContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { isPhoneNumberValid } from "@utils/phoneValidator";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Masks } from "react-native-mask-input";
import { useTheme } from "styled-components";
import { HeaderContainer } from "./styles";

export default function Profile() {
  const theme = useTheme();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { loadUserProfile, updateProfile, userProfile } = useData();

  const [profile, setProfile] = useState<IUserDTO>();
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigation.navigate("SignIn");
      return;
    }

    // loadUserProfile(user!.id).then((data) => {
    //   setProfile(data);
    //   setIsLoading(false);
    //   setName(data.name);
    //   setEmail(`${data.email}`);
    //   setPhone(data.phone ? `${data.phone}` : "");
    // });

    setName(`${userProfile?.name}`);
    setEmail(`${userProfile?.email}`);
    setPhone(`${userProfile?.phone}`);
    setIsLoading(false);
  }, [isSignedIn]);

  useFocusEffect(
    useCallback(() => {
      if (!isSignedIn) {
        navigation.navigate("SignIn");
        return;
      }
    }, [isSignedIn])
  );

  async function handleSaveProfile() {
    if (name.length === 0) return Alert.alert("Nome não pode estar em branco.");

    if (phone.length > 0 && !isPhoneNumberValid(phone)) {
      return Alert.alert(`Número de telefone inválido.`);
    }

    try {
      const updated = await updateProfile(user!.id, name, phone);
      navigation.goBack();
    } catch (error) {
      Alert.alert("error");
      console.log(JSON.stringify(error, null, 2));
    }
  }

  return (
    <AppScreenContainer
      headerColor={theme.colors.white}
      header={
        isSignedIn && (
          <HeaderContainer>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <AppCenter>
                <AppLogo size="sm" />
                <AppSpacer verticalSpace="sm" />
                <AppAvatar imagePath={`${userProfile?.image}`} size={180} />
                <AppSpacer verticalSpace="sm" />
                <AppText bold>Perfil público de </AppText>
                <AppText size="xlg" bold>
                  {userProfile?.name}
                </AppText>
              </AppCenter>
            )}
          </HeaderContainer>
        )
      }
    >
      <ScrollView>
        <AppSpacer verticalSpace="lg" />
        <AppInput
          label="Nome completo:"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <AppSpacer verticalSpace="lg" />
        <AppInput
          label="E-Mail:"
          editable={false}
          value={email}
          style={{
            color: theme.colors.text_disabled,
          }}
        />
        <AppSpacer verticalSpace="lg" />
        <AppInput
          label="Telefone:"
          value={phone}
          mask={Masks.BRL_PHONE}
          onChangeText={(text) => setPhone(text)}
        />
        <AppSpacer verticalSpace="xlg" />
        <AppButton
          title="Salvar"
          variant="positive"
          outline
          onPress={handleSaveProfile}
        />
        <AppSpacer />
        <AppButton title="Cancelar" variant="negative" outline />
      </ScrollView>
    </AppScreenContainer>
  );
}
