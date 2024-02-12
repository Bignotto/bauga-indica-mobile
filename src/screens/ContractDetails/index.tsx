import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppDateInput from "@components/AppDateInput";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { FontAwesome } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { IContract, IContractMessage, useData } from "@hooks/DataContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import * as yup from "yup";
import {
  ContractorProviderWrapper,
  MessageInputContainer,
  MessageItem,
  MessageWrapper,
  MessagesList,
  NegotiationWrapper,
  TopWrapper,
} from "./styles";

type Params = {
  contractId: string;
};

const validationSchema = yup.object({
  actualValue: yup
    .number()
    .required()
    .typeError("Valor inválido.")
    .positive("Valor inválido."),
});

export default function ContractDetails() {
  const route = useRoute();
  const { contractId } = route.params as Params;
  const navigation = useNavigation();

  const {
    getContractById,
    updateContract,
    createNewMessage,
    userProfile,
    contractAgreement,
    contractCancel,
  } = useData();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [contract, setContract] = useState<IContract>({} as IContract);
  const [actualDate, setActualDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState<IContractMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState("");

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isAgreeing, setIsAgreeing] = useState(false);

  const [userIs, setUserIs] = useState<"provider" | "contractor">("contractor");

  async function loadContractDetails() {
    setIsLoading(true);
    try {
      const response = await getContractById(contractId);
      setContract(response);
      setActualDate(new Date(response.due_date));
      setValue("actualValue", response.value);
      setMessages(response.messages ?? []);

      setUserIs(
        userProfile?.id === response.user_contractor_id.id
          ? "contractor"
          : "provider"
      );
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      return Alert.alert("erro ao acessar dados");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContractDetails();
  }, []);

  function setDateValue(dateValue: Date | undefined) {
    if (dateValue) {
      setActualDate(dateValue);
      setHasChanges(true);
    }
  }

  async function handleSave({ actualValue }: any) {
    const yesterday = moment(new Date()).add(-1, "days").toDate().getTime();

    if (actualDate && actualDate.getTime() < yesterday)
      return Alert.alert("A data não pode ser no passado.");

    if (!hasChanges) return;

    setIsSaving(true);
    try {
      const response = await updateContract({
        id: `${contract.id}`,
        due_date: actualDate,
        value: actualValue,
      });

      setHasChanges(false);
      if (response) setContract(response);
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSendMessage() {
    setIsSendingMessage(true);
    try {
      const newMessage = {
        contract_id: `${contract.id}`,
        user_from_id: `${userProfile!.id}`,
        message_date: new Date(),
        message_read: false,
        text: newMessageText,
      };
      const response = await createNewMessage(newMessage);
      setMessages((m) => m.concat(response));
      setNewMessageText("");
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    } finally {
      setIsSendingMessage(false);
    }
  }

  async function handleAgree() {
    setIsAgreeing(true);

    try {
      if (contract.user_provider_id.id === userProfile!.id) {
        //user is provider
        const response = await contractAgreement(
          `${contract.id}`,
          "provider",
          contract.contractor_agreed === true ? "executing" : undefined
        );
        setContract(response);
      }

      if (contract.user_contractor_id.id === userProfile!.id) {
        //user is contractor
        const response = await contractAgreement(
          `${contract.id}`,
          "contractor",
          contract.provider_agreed === true ? "executing" : undefined
        );
        setContract(response);
      }
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    } finally {
      setIsAgreeing(false);
    }
  }

  async function confirmAgreement() {
    return Alert.alert(
      `Você concorda com os termos?`,
      `Execução em ${moment(actualDate).format("DD/MM/yyyy")} por R$ ${
        contract.value
      }`,
      [
        {
          text: "Sim",
          onPress: handleAgree,
        },
        {
          text: "Não",
        },
      ]
    );
  }

  async function handleCancel() {
    try {
      const response = await contractCancel(`${contract.id}`);

      navigation.goBack();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert(error.message);
      }
      Alert.alert("Ocorreu um erro desconhecido!");
    }
  }

  async function confirmCancel() {
    return Alert.alert(
      `Cancelar o contrato?`,
      `Tem certeza que quer cancelar o serviço ${contract.service_id.title}?`,
      [
        {
          text: "Sim",
          onPress: handleCancel,
        },
        {
          text: "Não",
        },
      ]
    );
  }

  // const agreementStatus: 'none' | 'only_contractor' | 'only_provider' | 'both' = contract.provider_agreed

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <AppScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContractorProviderWrapper>
          <AppAvatar
            size={36}
            imagePath={
              contract.user_provider_id.id === userProfile!.id
                ? contract.user_contractor_id.image
                : contract.user_provider_id.image
            }
          />
          <AppText bold size="lg">
            {contract.user_provider_id.id === userProfile!.id
              ? contract.user_contractor_id.name
              : contract.user_provider_id.name}
          </AppText>
        </ContractorProviderWrapper>
        <TopWrapper>
          <AppText size="lg" bold>
            {contract.service_id.title}
          </AppText>
          <AppText>{contract.service_id.description}</AppText>
        </TopWrapper>
        <NegotiationWrapper>
          <AppDateInput
            label="Em:"
            value={`${moment(actualDate).format("DD/MM/yyyy")}`}
            onChangeDate={setDateValue}
            disabled={userProfile?.id !== contract.user_provider_id.id}
          />

          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Por:"
                  onBlur={onBlur}
                  onChangeText={(t) => {
                    setHasChanges(true);
                    onChange(t);
                  }}
                  value={`${value}`}
                  keyboardType="decimal-pad"
                  error={errors.actualValue?.message}
                  editable={
                    userProfile?.id === contract.user_provider_id.id &&
                    contract.contract_status !== "open"
                  }
                />
              )}
              name="actualValue"
            />
          </View>
          <View
            style={{
              marginTop: 8,
              justifyContent: "center",
            }}
          >
            <AppButton
              title="Salvar"
              enabled={userProfile?.id === contract.user_provider_id.id}
              onPress={() => handleSubmit(handleSave)()}
              isLoading={isSaving}
            />
          </View>
        </NegotiationWrapper>
        <MessagesList>
          <ScrollView>
            {messages.length > 0 &&
              messages.map((m) => (
                <MessageWrapper
                  key={m.id}
                  isSender={m.user_from_id === userProfile?.id}
                >
                  <MessageItem>
                    <AppText>{m.text}</AppText>
                  </MessageItem>
                  <AppText size="xsm">
                    {moment(m.message_date).format("DD/MM/yyyy - HH:mm")}
                  </AppText>
                  <AppSpacer verticalSpace="sm" />
                </MessageWrapper>
              ))}
          </ScrollView>
          <MessageInputContainer>
            <View style={{ minWidth: "80%" }}>
              <AppInput
                value={newMessageText}
                onChangeText={(t) => setNewMessageText(t)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AppButton
                rightIcon={
                  isSendingMessage ? (
                    <ActivityIndicator />
                  ) : (
                    <FontAwesome
                      name="send"
                      size={24}
                      color={theme.colors.white}
                    />
                  )
                }
                onPress={handleSendMessage}
              />
            </View>
          </MessageInputContainer>
        </MessagesList>
        <AppSpacer />
        <AppText size="sm" bold>
          {userIs === "contractor"
            ? contract.provider_agreed
              ? `${contract.user_provider_id.name} concordou com os termos. Aguarde a execução do serviço.`
              : `Aguarde até que ${contract.user_provider_id.name} concorde com o valor e a data.`
            : contract.contractor_agreed
            ? `${contract.user_contractor_id.name} concordou com os termos. Você já pode executar o serviço.`
            : `Aguarde até que ${contract.user_contractor_id.name} concorde com o valor e a data.`}
        </AppText>
        <AppSpacer />
        <AppButton
          title={
            isAgreeing
              ? undefined
              : userIs === "contractor"
              ? contract.contractor_agreed
                ? "Você concordou!"
                : "Concordar"
              : contract.provider_agreed
              ? "Você concordou!"
              : "Concordar"
          }
          enabled={
            userIs === "contractor"
              ? contract.contractor_agreed
                ? false
                : true
              : contract.provider_agreed
              ? false
              : true
          }
          variant="positive"
          onPress={confirmAgreement}
        />
        <AppSpacer />
        <AppButton
          title="Cancelar contrato"
          outline
          variant="negative"
          enabled={!contract.service_provided}
          onPress={confirmCancel}
        />
        <AppSpacer />
      </ScrollView>
    </AppScreenContainer>
  );
}
