import ServiceAdCard from "@components/ServiceAdCard";
import { IUserServiceAd } from "@hooks/DataContext";
import { ResultListWrapper } from "./styles";

interface ResultListProps {
  itens: IUserServiceAd[];
  searchText: string;
}

export default function ResultList({ itens, searchText }: ResultListProps) {
  return (
    <ResultListWrapper>
      {itens.map((item) => (
        <ServiceAdCard
          key={item.id}
          searchText={searchText}
          showButton={false}
          showReviewScore
          service={{
            id: item.id,
            value: item.value,
            title: item.title,
            description: item.description,
            serviceType: {
              id: item.serviceTypeId?.id,
              name: item.serviceTypeId?.name,
            },
            review: {
              count: item.reviews ? item.reviews.length : 0,
              score_total: item.reviews
                ? item.reviews
                    .map((r) => r.score)
                    .reduce((acc, c) => acc + c, 0)
                : 0,
            },
            provider: {
              id: item.providerId?.id,
              phone: `${item.providerId?.phone}`,
              image: item.providerId?.image,
              name: item.providerId?.name,
            },
          }}
        />
      ))}
    </ResultListWrapper>
  );
}
