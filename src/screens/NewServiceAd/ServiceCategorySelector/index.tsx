import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import React from "react";
import { Modal, ModalProps } from "react-native";
import { ModalItemsWrapper } from "./styles";

export interface ServiceCategoryItem {
  title?: string;
  id?: string;
}

interface ServiceCategorySelectorProps extends ModalProps {
  someProps?: boolean;
  itens: ServiceCategoryItem[];
  visible: boolean;
  onClose(): void;
}

export default function ServiceCategorySelector({
  someProps,
  itens,
  onClose,
  visible,
  ...rest
}: ServiceCategorySelectorProps) {
  function handleClose() {
    console.log("pressionou");
    onClose();
  }
  return (
    <Modal {...rest}>
      <ModalItemsWrapper>
        {itens && itens.map((i) => <AppText key={i.id}>{i.title}</AppText>)}
        <AppButton
          title="Cancelar"
          onPress={() => {
            console.log("aaaaaa");
          }}
        />
      </ModalItemsWrapper>
    </Modal>
  );
}
