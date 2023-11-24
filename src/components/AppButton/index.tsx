import AppText from "@components/AppText";
import { ReactNode } from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { ButtonContainer, ButtonWrapper } from "./styles";

type AppButtonProps = RectButtonProps & {
  title: string;
  variant?: "positive" | "solid" | "negative";
  isLoading?: boolean;
  size?: "lg" | "md" | "sm";
  outline?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function AppButton({
  title,
  variant = "solid",
  isLoading = false,
  size = "md",
  enabled = true,
  outline = false,
  leftIcon,
  rightIcon,
  ...rest
}: AppButtonProps) {
  const theme = useTheme();

  const buttonColor =
    variant === "positive"
      ? theme.colors.positive
      : variant === "negative"
      ? theme.colors.negative
      : theme.colors.primary;

  const textColor = outline ? buttonColor : theme.colors.white;

  return (
    <ButtonWrapper outline={outline} color={buttonColor}>
      <ButtonContainer enabled={enabled} {...rest}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {leftIcon && <>{leftIcon}</>}
            <AppText
              bold
              color={enabled ? textColor : theme.colors.text_disabled}
              size={size}
              style={{
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              {title}
            </AppText>
            {rightIcon && <>{rightIcon}</>}
          </>
        )}
      </ButtonContainer>
    </ButtonWrapper>
  );
}
