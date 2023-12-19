import { Service } from "src/@types/services/Service";

export type StackParamList = {
  Home: {} | undefined;
  SignIn: {} | undefined;
  SignUp: {} | undefined;
  CreateAccount:
    | {
        name: string;
      }
    | undefined;
  Search: {
    searchText: string;
  };
  ServiceDetails: {
    serviceId: string;
  };
  NewContract: {
    serviceData: Service;
  };
  Dashboard: {} | undefined;
  UserServiceAds: {} | undefined;
  NewServiceAd: {} | undefined;
};
