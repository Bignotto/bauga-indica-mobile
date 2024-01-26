import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { IContract, useData } from "@hooks/DataContext";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { NegotiationWrapper, TopWrapper } from "./styles";

type Params = {
  contractId: string;
};

export default function ContractDetails() {
  const route = useRoute();
  const { contractId } = route.params as Params;

  const { getContractById, userProfile } = useData();

  const [contract, setContract] = useState<IContract>({} as IContract);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [actualDate, setActualDate] = useState<Date>();
  const [actualValue, setActualValue] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  async function loadContractDetails() {
    setIsLoading(true);
    try {
      const response = await getContractById(contractId);
      setContract(response);
      setActualDate(new Date(response.due_date));
      setActualValue(response.value);
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

  function onChangeDate(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    setShowDatePicker(false);
    setActualDate(selectedDate);
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <AppScreenContainer>
      <TopWrapper>
        <AppText size="lg" bold>
          {contract.service_id.title}
        </AppText>
        <AppText>{contract.service_id.description}</AppText>
      </TopWrapper>
      <NegotiationWrapper>
        <AppText>O serviço será executado em:</AppText>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          disabled={userProfile?.id !== contract.user_provider_id.id}
        >
          <AppInput
            editable={false}
            value={`${moment(actualDate ?? new Date()).format("DD/MM/yyyy")}`}
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker value={actualDate!} onChange={onChangeDate} />
        )}
        <AppText>Valor total do serviço</AppText>
        <AppInput
          value={String(actualValue)}
          editable={userProfile?.id === contract.user_provider_id.id}
        />

        <AppButton
          title="Salvar"
          enabled={userProfile?.id === contract.user_provider_id.id}
        />
      </NegotiationWrapper>
    </AppScreenContainer>
  );
}
