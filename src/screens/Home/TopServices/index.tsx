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
            topService={s}
            showDescription={true}
            showProvider={true}
            key={s.service_id}
          />
        ))}
    </Container>
  );
}
