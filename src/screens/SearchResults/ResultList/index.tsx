import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { Service } from "src/@types/services/Service";
import { useTheme } from "styled-components";
import {
  ContentWrapper,
  ProviderAvatar,
  ProviderInfoWrapper,
  ProviderName,
  ProviderPriceWrapper,
  ResultItem,
  ResultListWrapper,
  Tag,
  TagText,
  TagWrapper,
  TitleWrapper,
} from "./styles";

interface ResultListProps {
  itens: Service[];
}

export default function ResultList({ itens }: ResultListProps) {
  const theme = useTheme();
  return (
    <ResultListWrapper>
      {itens.map((item) => (
        <ResultItem key={item.id}>
          <TitleWrapper>
            <AppText bold size="lg">
              {item.title}
            </AppText>
          </TitleWrapper>
          <ContentWrapper>
            <AppText>{item.description}</AppText>
            <TagWrapper>
              <Tag>
                <TagText>{item.serviceType.name}</TagText>
              </Tag>
            </TagWrapper>

            <ProviderPriceWrapper>
              <ProviderInfoWrapper>
                <ProviderAvatar
                  source={{
                    uri: item.provider.image,
                  }}
                />
                <ProviderName>
                  <AppText bold>{item.provider.name}</AppText>
                </ProviderName>
              </ProviderInfoWrapper>
              <AppText bold size="lg" color={theme.colors.primary_dark}>
                {`R$ ${item.value.toFixed(2)}`}
              </AppText>
            </ProviderPriceWrapper>
            <AppButton title="Ver detalhes" />
          </ContentWrapper>
        </ResultItem>
      ))}
    </ResultListWrapper>
  );
}
