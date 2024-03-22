import { IUserServiceAd } from "@hooks/DataContext";

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
    service: IUserServiceAd;
  };
  Dashboard: {} | undefined;
  UserServiceAds: {} | undefined;
  NewServiceAd: {} | undefined;
  ContractDetails:
    | {
        contractId: string;
      }
    | undefined;
  UserContractedServices: {} | undefined;
  UserProvidedServices: {} | undefined;
  ContractCreated: {} | undefined;
  NewReview: {} | undefined;
};
