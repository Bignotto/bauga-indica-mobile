import AppButton from "@components/AppButton";
import AppDateInput from "@components/AppDateInput";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { IContract, IContractMessage, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";
import {
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

  const { getContractById, updateContract, userProfile } = useData();

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

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function loadContractDetails() {
    setIsLoading(true);
    try {
      const response = await getContractById(contractId);
      setContract(response);
      setActualDate(new Date(response.due_date));
      setValue("actualValue", response.value);
      setMessages(response.messages ?? []);
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

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <AppScreenContainer>
      <ScrollView>
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
                  editable={userProfile?.id === contract.user_provider_id.id}
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
                </MessageWrapper>
              ))}
          </ScrollView>
        </MessagesList>
      </ScrollView>
    </AppScreenContainer>
  );
}
