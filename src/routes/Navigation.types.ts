import { Service } from "src/@types/services/Service";

export type StackParamList = {
  Home: {} | undefined;
  OAuth: {} | undefined;
  Search: {
    searchText: string;
  };
  ServiceDetails: {
    serviceId: string;
  };
  NewContract: {
    serviceData: Service;
  };
};
