import AppButton from "@components/AppButton";
import AppDateInput from "@components/AppDateInput";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { AppError } from "@errors/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { IContract, useData } from "@hooks/DataContext";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, View } from "react-native";
import * as yup from "yup";
import { NegotiationWrapper, TopWrapper } from "./styles";

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

  const { getContractById, userProfile } = useData();

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

  const [isSaving, setIsSaving] = useState(false);

  async function loadContractDetails() {
    setIsLoading(true);
    try {
      const response = await getContractById(contractId);
      setContract(response);
      setActualDate(new Date(response.due_date));
      setValue("actualValue", response.value);
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
    }
  }

  function handleSave({ actualValue }: any) {
    const yesterday = moment(new Date()).add(-1, "days").toDate().getTime();

    if (actualDate && actualDate.getTime() < yesterday)
      return Alert.alert("A data não pode ser no passado.");

    if (
      actualDate?.getTime() === new Date(contract.due_date).getTime() ||
      actualValue === contract.value
    ) {
      return;
    }

    //NEXT:update contract info!
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
                onChangeText={onChange}
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
          />
        </View>
      </NegotiationWrapper>
    </AppScreenContainer>
  );
}
