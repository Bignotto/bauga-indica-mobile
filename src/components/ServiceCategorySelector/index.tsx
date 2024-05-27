import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { IServiceType } from "@hooks/DataContext";
import React from "react";
import { Modal, ModalProps, Pressable, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import {
  CancelButton,
  ContentWrapper,
  ItemWrapper,
  ModalItemsWrapper,
  OptionsWrapper,
} from "./styles";

interface ServiceCategorySelectorProps extends ModalProps {
  itens: IServiceType[] | undefined;
  onSelect(category: IServiceType | undefined): void;
  selectedItem?: IServiceType;
}

export default function ServiceCategorySelector({
  itens,
  onSelect,
  selectedItem,
  ...rest
}: ServiceCategorySelectorProps) {
  const theme = useTheme();

  return (
    <Modal
      {...rest}
      statusBarTranslucent
      animationType="fade"
      transparent={true}
    >
      <ModalItemsWrapper>
        <ContentWrapper>
          <AppSpacer verticalSpace="xlg" />
          <AppText>Selecione a categoria do seu anúncio:</AppText>
          <AppSpacer verticalSpace="xlg" />

          <OptionsWrapper>
            <ScrollView>
              {itens &&
                itens.map((i) => (
                  <Pressable
                    key={i.id}
                    onPress={() => onSelect(i)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                    ]}
                  >
                    <ItemWrapper
                      style={{
                        backgroundColor:
                          i.id === selectedItem?.id
                            ? theme.colors.text_disabled
                            : theme.colors.white,
                      }}
                    >
                      <AppText>{i.name}</AppText>
                    </ItemWrapper>
                  </Pressable>
                ))}
            </ScrollView>
          </OptionsWrapper>
          <AppSpacer />
          <TouchableOpacity onPress={() => onSelect(undefined)}>
            <CancelButton>
              <AppText color={theme.colors.white}>Cancelar</AppText>
            </CancelButton>
          </TouchableOpacity>
          <AppSpacer verticalSpace="xlg" />
        </ContentWrapper>
      </ModalItemsWrapper>
    </Modal>
  );
}
