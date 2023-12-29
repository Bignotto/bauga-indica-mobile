import AppText from "@components/AppText";
import React from "react";
import { Modal, ModalProps, Pressable } from "react-native";
import { ModalItemsWrapper } from "./styles";

export interface ServiceCategoryItem {
  title?: string;
  id?: string;
}

interface ServiceCategorySelectorProps extends ModalProps {
  someProps?: boolean;
  itens: ServiceCategoryItem[];
  onClose(): void;
}

export default function ServiceCategorySelector({
  someProps,
  itens,
  onClose,
  ...rest
}: ServiceCategorySelectorProps) {
  return (
    <Modal {...rest}>
      <ModalItemsWrapper>
        {itens && itens.map((i) => <AppText key={i.id}>{i.title}</AppText>)}
        <Pressable onPress={onClose}>
          <AppText>Fechar</AppText>
        </Pressable>
      </ModalItemsWrapper>
    </Modal>
  );
}
