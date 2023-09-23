import AppText from "@components/AppText";
import { Service } from "src/@types/services/Service";
import {
  ContentWrapper,
  ProviderAvatar,
  ProviderInfoWrapper,
  ProviderName,
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
          </ContentWrapper>
        </ResultItem>
      ))}
    </ResultListWrapper>
  );
}
