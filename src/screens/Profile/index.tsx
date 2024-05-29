import { useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppCenter from "@components/AppCenter";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useData } from "@hooks/DataContext";
import { usePhoneVerification } from "@hooks/PhoneVrifyHook";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import { isPhoneNumberValid } from "@utils/phoneValidator";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Masks } from "react-native-mask-input";
import { useTheme } from "styled-components";
import { AvatarWrapper, HeaderContainer, ImageEditIcon } from "./styles";

export default function Profile() {
  const theme = useTheme();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { updateProfile, userProfile } = useData();
  const { sendVerification } = usePhoneVerification();

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  function setFormValues() {
    setName(`${userProfile?.name}`);
    setEmail(`${userProfile?.email}`);
    setPhone(`${userProfile?.phone}`);
    setSavedPhone(`${userProfile?.phone}`);
    setImage(`${userProfile?.image}`);
  }

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigation.navigate("SignIn");
      return;
    }

    setFormValues();
    setIsLoading(false);
  }, [isSignedIn]);

  useFocusEffect(
    useCallback(() => {
      if (!isSignedIn) {
        navigation.navigate("SignIn");
        return;
      }
      setFormValues();
    }, [isSignedIn])
  );

  async function handleSaveProfile() {
    if (name.length === 0) return Alert.alert("Nome não pode estar em branco.");

    if (phone.length > 0 && !isPhoneNumberValid(phone)) {
      return Alert.alert(`Número de telefone inválido.`);
    }

    setIsLoading(true);
    try {
      const updated = await updateProfile(user!.id, name, phone);

      if (phone !== savedPhone) {
        const response = await sendVerification(phone);
        if (response)
          navigation.navigate("PhoneValidation", {
            phone,
          });
        return;
      }

      navigation.reset({ routes: [{ name: "Home" }] });
    } catch (error) {
      Alert.alert(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImageSelect() {
    const selectedImages = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (selectedImages.canceled) return;

    setImage(selectedImages.assets[0].uri);

    //NEXT: update image info in database
    //onAddImage(selectedImages.assets[0].uri);
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
                <AvatarWrapper>
                  <AppAvatar imagePath={`${image}`} size={180} />
                  <ImageEditIcon onPress={handleImageSelect}>
                    <MaterialIcons
                      name="mode-edit"
                      size={24}
                      color={theme.colors.white}
                    />
                  </ImageEditIcon>
                </AvatarWrapper>
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
          keyboardType="phone-pad"
          value={phone}
          mask={Masks.BRL_PHONE}
          onChangeText={(text) => setPhone(text)}
        />
        {userProfile?.phoneConfirmed ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MaterialCommunityIcons
              name="cellphone-check"
              size={24}
              color="green"
            />
            <AppText bold size="sm" color="">
              Número de telefone verificado
            </AppText>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MaterialCommunityIcons
              name="cellphone-remove"
              size={24}
              color="orange"
            />
            <AppText bold size="sm">
              Número de telefone não verificado
            </AppText>
          </View>
        )}

        <AppSpacer verticalSpace="xlg" />
        <AppButton
          title="Salvar"
          variant="positive"
          outline
          onPress={handleSaveProfile}
          isLoading={isLoading}
        />
        <AppSpacer />
        <AppButton title="Cancelar" variant="negative" outline />
      </ScrollView>
    </AppScreenContainer>
  );
}
