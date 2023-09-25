import AppService from "@components/AppService";
import { Service } from "src/@types/services/Service";
import { ResultListWrapper } from "./styles";

interface ResultListProps {
  itens: Service[];
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
