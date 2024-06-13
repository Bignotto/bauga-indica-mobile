import { IUserServiceAd } from "@hooks/DataContext";

export type StackParamList = {
  Home: {} | undefined;
  SignIn: {} | undefined;
  SignUp: {} | undefined;
  Profile: {} | undefined;
  PhoneValidation: {
    phone: string;
  };
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
    searchTerm?: string;
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
  NewReview: { service: IUserServiceAd };
  EditServiceAd: { serviceAdId: string };
};
