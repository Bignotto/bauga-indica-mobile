import ServiceAdCard from "@components/ServiceAdCard";
import { AppError } from "@errors/AppError";
import { ITopServiceAds, useData } from "@hooks/DataContext";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Container } from "./styles";

export default function TopServices() {
  const { topServiceAds } = useData();

  const [topServices, setTopServices] = useState<ITopServiceAds[] | undefined>(
    []
  );

  useEffect(() => {
    async function loadTopServices() {
      try {
        const response = await topServiceAds();
        setTopServices(response);
      } catch (error) {
        console.log({ error });
        if (error instanceof AppError) return Alert.alert(error.message);

        return Alert.alert("erro desconhecido");
      }
    }
    loadTopServices();
  }, []);
  return (
    <Container>
      {topServices &&
        topServices.map((s) => (
          <ServiceAdCard
            showDescription={false}
            showProvider={true}
            key={s.service_id}
            showReviewScore={true}
            showButton={false}
            service={{
              id: s.service_id,
              value: s.service_value,
              description: s.description,
              provider: {
                phone: s.provider_name,
                name: s.provider_name,
                id: s.provider_id,
                image: s.provider_image,
              },
              rating: 5,
              serviceType: {
                id: s.service_type_id,
                name: s.service_type,
              },
              title: s.title,
              review: {
                count: s.review_count,
                score_total: s.score_total,
              },
            }}
          />
        ))}
    </Container>
  );
}
