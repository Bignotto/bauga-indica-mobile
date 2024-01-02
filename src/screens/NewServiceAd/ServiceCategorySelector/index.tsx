import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
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

export interface ServiceCategoryItem {
  title?: string;
  id?: string;
}

interface ServiceCategorySelectorProps extends ModalProps {
  someProps?: boolean;
  itens: ServiceCategoryItem[];
  onSelect(category: ServiceCategoryItem | undefined): void;
}

export default function ServiceCategorySelector({
  someProps,
  itens,
  onSelect,
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
                    <ItemWrapper>
                      <AppText>{i.title}</AppText>
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
