import { IUserServiceAd } from "@hooks/DataContext";
import AppService from "@screens/SearchResults/ResultList/AppService";
import { ResultListWrapper } from "./styles";

interface ResultListProps {
  itens: IUserServiceAd[];
}

export default function ResultList({ itens }: ResultListProps) {
  return (
    <ResultListWrapper>
      {itens.map((item) => (
        <AppService item={item} key={item.id} />
      ))}
    </ResultListWrapper>
  );
}
