import { AppError } from "@errors/AppError";
import supabase from "@services/supabase";
import { ReactNode, createContext, useContext, useState } from "react";

interface DataProviderProps {
  children: ReactNode;
}

type IUserDTO = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  userType?: string;
  image?: string;
  phoneConfirmed?: boolean;
};

type IServiceType = {
  id: number;
  name?: string;
  description?: string;
};

type IDashboardData = {
  servicesAdCount: number;
  servicesContractedCount: number;
  contractsCount: number;
  visualisationsCount: number;
  reviewsCount: number;
};

type IUserServiceAd = {
  id?: string;
  title: string;
  description: string;
  value: number;
  service_class?: string;
  valid_to?: Date;
  valid_from?: Date;
  created_at?: Date;
  updated_at?: Date;
  providerId?: {
    id: string;
    name: string;
    image: string;
    phone: string;
  };
  serviceTypeId?: {
    id: number;
    name: string;
    description: string;
  };
  service_images?: {
    id: number;
    imagePath: string;
  }[];
  reviews?: IServiceReview[];
};

type ICreateServiceDTO = {
  id?: string;
  title: string;
  description: string;
  value: number;
  validFrom: Date;
  validTo: Date;
  serviceTypeId?: number;
  providerId?: string;
};

type ICreateContractDTO = {
  value: number;
  service_id: string;
  user_provider_id: string;
  user_contractor_id: string;
  due_date: Date;
};

type IUpdateContractDTO = {
  id: string;
  due_date?: Date;
  value?: number;
};

type IContract = {
  id?: string;
  contract_status: "open" | "executing" | "canceled" | "closed";
  value: number;
  service_id: IUserServiceAd;
  create_date: Date;
  user_provider_id: {
    id: string;
    name: string;
    image: string;
  };
  user_contractor_id: {
    id: string;
    name: string;
    image: string;
  };
  due_date: Date;
  execution_date: Date;
  closing_date: Date;
  service_provided: boolean;
  service_reviewed: boolean;
  provider_agreed: boolean;
  contractor_agreed: boolean;
  messages?: IContractMessage[];
};

type IContractMessage = {
  id?: number;
  message_date?: Date;
  text: string;
  message_read: boolean;
  contract_id: string;
  user_from_id: string;
};

type IServiceReview = {
  id?: string;
  title: string;
  text: string;
  review_date: Date;
  score: number;
  contract_id?: string;
  service_id?: string;
  reviewer_id?:
    | string
    | {
        id: string;
        name?: string;
        image?: string;
      };
};

type IActivityLog = {
  id?: number;
  event: string;
  event_date?: Date;
  subject: string;
  data?: string;
  user_id?: string;
  user_provider?: string;
};

type ITopServiceAds = {
  clicks: number;
  service_id: string;
  title: string;
  description: string;
  service_type: string;
  service_type_id: number;
  provider_id: string;
  provider_name: string;
  provider_image: string;
  service_value: number;
  review_count: number;
  score_total: number;
};

interface IDataContextProps {
  userProfile: IUserDTO | undefined;
  isEmailAvailable(email: string): Promise<boolean>;
  createNewAccount(newUser: IUserDTO): Promise<IUserDTO>;
  loadUserProfile(userId: string): Promise<IUserDTO>;
  updateProfile(userId: string, name: string, phone: string): Promise<IUserDTO>;
  setPhoneConfirmed(userId: string): Promise<IUserDTO>;
  getDashboardData(): Promise<IDashboardData>;
  getUserServiceAds(): Promise<IUserServiceAd[] | undefined>;
  getAvailableServiceTypes(): Promise<IServiceType[] | undefined>;
  createServiceAd(newService: ICreateServiceDTO): Promise<IUserServiceAd>;
  updateServiceAdImages(serviceId: string, images: string[]): Promise<void>;
  search(searchText: string): Promise<IUserServiceAd[]>;
  getServiceAdById(serviceAdId: string): Promise<IUserServiceAd | undefined>;
  createNewContract(newContract: ICreateContractDTO): Promise<IContract>;
  createNewMessage(newMessage: IContractMessage): Promise<IContractMessage>;
  getUserContractedServices(): Promise<IContract[]>;
  getContractById(contractId: string): Promise<IContract>;
  getUserProvidedServices(): Promise<IContract[]>;
  updateContract(newInfo: IUpdateContractDTO): Promise<IContract | undefined>;
  contractAgreement(
    contractId: string,
    userAgreeing: "contractor" | "provider",
    newStatus?: string
  ): Promise<IContract>;
  contractCancel(contractId: string): Promise<void>;
  contractExecuted(contractId: string): Promise<void>;
  createNewReview(newReview: IServiceReview): Promise<void>;
  activityLog(logData: IActivityLog): Promise<void>;
  removeImageFromService(serviceAdId: string, imagePath: string): Promise<void>;
  updateServiceAd(newData: ICreateServiceDTO): Promise<IUserServiceAd>;
  updateProfileImage(userId: string, newImagePath: string): Promise<void>;
  topServiceAds(): Promise<ITopServiceAds[] | undefined>;
}

const DataContext = createContext({} as IDataContextProps);

function DataProvider({ children }: DataProviderProps) {
  const [userProfile, setUserProfile] = useState<IUserDTO>();

  async function isEmailAvailable(email: string) {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR on email available check", 500, "supabase");
    }

    if (data.length > 0) return false;

    return true;
  }

  async function createNewAccount(newUser: IUserDTO) {
    const { data, error } = await supabase.from("users").insert([newUser]);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while saving new user into database",
        500,
        "supabase"
      );
    }

    setUserProfile(newUser);
    return newUser;
  }

  async function loadUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while loading user profile", 500, "supabase");
    }

    if (data) {
      setUserProfile(data[0]);
      return data[0];
    }

    return undefined;
  }

  async function updateProfile(userId: string, name: string, phone: string) {
    const { data, error } = await supabase
      .from("users")
      .update({
        name,
        phone,
      })
      .eq("id", userId)
      .select();

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while updating user into database",
        500,
        "supabase"
      );
    }

    if (data) {
      setUserProfile(data[0]);
      return data[0];
    }
    return undefined;
  }

  async function setPhoneConfirmed(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .update({
        phoneConfirmed: true,
      })
      .eq("id", userId)
      .select();

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR phone confirmed - while updating user into database",
        500,
        "supabase"
      );
    }

    if (data) {
      setUserProfile(data[0]);
      return data[0];
    }
    return undefined;
  }

  async function getDashboardData() {
    const { data: servicesData, error: servicesError } = await supabase
      .from("services")
      .select("id")
      .eq("providerId", userProfile?.id);
    if (servicesError) {
      console.log(JSON.stringify(servicesError, null, 2));
      throw new AppError("ERROR on dashboard data loading", 500, "supabase");
    }

    const { data: contractsData, error: contractsError } = await supabase
      .from("contracts")
      .select("id")
      .eq("user_provider_id", userProfile?.id);
    if (contractsError) {
      console.log(JSON.stringify(contractsError, null, 2));
      throw new AppError("ERROR on dashboard data loading", 500, "supabase");
    }

    const { data: servicesContractedData, error: servicesContractedError } =
      await supabase
        .from("contracts")
        .select("id")
        .eq("user_contractor_id", userProfile?.id);
    if (servicesContractedError) {
      console.log(JSON.stringify(contractsError, null, 2));
      throw new AppError("ERROR on dashboard data loading", 500, "supabase");
    }

    const dashboardData: IDashboardData = {
      contractsCount: contractsData.length,
      servicesAdCount: servicesData.length,
      servicesContractedCount: servicesContractedData.length,
      visualisationsCount: 0,
      reviewsCount: 0,
    };

    return dashboardData;
  }

  async function getUserServiceAds(): Promise<IUserServiceAd[] | undefined> {
    const { data, error } = await supabase
      .from("services")
      .select("*,providerId(id,name,image),serviceTypeId(*)")
      .eq("providerId", userProfile?.id);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while loading user service ads",
        500,
        "supabase"
      );
    }
    if (data) return data;

    return undefined;
  }

  async function createServiceAd(
    newService: ICreateServiceDTO
  ): Promise<IUserServiceAd> {
    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          title: newService.title,
          description: newService.description,
          value: newService.value,
          service_class: "A",
          valid_to: newService.validTo,
          valid_from: newService.validFrom,
          providerId: newService.providerId,
          serviceTypeId: newService.serviceTypeId,
        },
      ])
      .select();

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while saving new service into database",
        500,
        "supabase"
      );
    }

    return data[0];
  }

  async function getAvailableServiceTypes(): Promise<
    IServiceType[] | undefined
  > {
    const { data, error } = await supabase.from("service_types").select();
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while loading service types", 500, "supabase");
    }
    if (data) return data;

    return undefined;
  }

  async function updateServiceAdImages(
    serviceId: string,
    images: string[]
  ): Promise<void> {
    const insertArray = images.map((img) => {
      return {
        imagePath: `${process.env.EXPO_PUBLIC_STORAGE_BASE_URL}/images_services/${img}`,
        serviceId,
      };
    });
    const { data, error } = await supabase
      .from("service_images")
      .insert(insertArray);

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while updating service images database",
        500,
        "supabase"
      );
    }
  }

  async function search(searchText: string): Promise<IUserServiceAd[]> {
    const { data, error } = await supabase
      .from("services")
      .select("*,serviceTypeId(*),providerId(*),reviews(*)")
      .or(`title.ilike.%${searchText}%,description.ilike.%${searchText}%`);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while searching database", 500, "supabase");
    }

    const { data: logData, error: error2 } = await supabase.from("log").insert([
      {
        event: "search",
        subject: searchText,
        user_id: userProfile ? userProfile.id : "guest",
      },
    ]);

    if (error2) {
      console.log(JSON.stringify(error2, null, 2));
      throw new AppError("ERROR while logging search", 500, "supabase");
    }

    if (data) return data;

    return [];
  }

  async function getServiceAdById(
    serviceAdId: string
  ): Promise<IUserServiceAd | undefined> {
    const { data, error } = await supabase
      .from("services")
      .select(
        "*,serviceTypeId(*),providerId(*),service_images(id,imagePath),reviews(*,reviewer_id(*))"
      )
      .eq("id", serviceAdId);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while loading service ad", 500, "supabase");
    }

    if (data) return data[0];

    return undefined;
  }

  async function createNewContract(
    newContract: ICreateContractDTO
  ): Promise<IContract> {
    console.log({ newContract });
    const { data, error } = await supabase
      .from("contracts")
      .insert([newContract])
      .select();

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while creating new contract", 500, "supabase");
    }

    return data[0];
  }

  async function createNewMessage(
    newMessage: IContractMessage
  ): Promise<IContractMessage> {
    const { data, error } = await supabase
      .from("messages")
      .insert([newMessage])
      .select();
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while creating new message", 500, "supabase");
    }

    return data[0];
  }

  async function getUserContractedServices(): Promise<IContract[]> {
    const { data, error } = await supabase
      .from("contracts")
      .select(
        "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
      )
      .eq("user_contractor_id", userProfile?.id)
      .order("create_date", {
        ascending: false,
      });
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while listing contracts", 500, "supabase");
    }
    if (data) return data;
    return [];
  }

  async function getContractById(contractId: string): Promise<IContract> {
    const { data, error } = await supabase
      .from("contracts")
      .select(
        "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
      )
      .eq("id", contractId);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while loading contract details",
        500,
        "supabase"
      );
    }
    if (data.length > 0) return data[0];

    throw new AppError("Contract id not found", 404, "supabase");
  }

  async function getUserProvidedServices(): Promise<IContract[]> {
    const { data, error } = await supabase
      .from("contracts")
      .select(
        "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
      )
      .eq("user_provider_id", userProfile?.id)
      .order("create_date", {
        ascending: false,
      });
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while listing contracts", 500, "supabase");
    }
    if (data) return data;
    return [];
  }

  async function updateContract({
    id,
    due_date,
    value,
  }: IUpdateContractDTO): Promise<IContract | undefined> {
    const { data, error } = await supabase
      .from("contracts")
      .update({ due_date, value })
      .eq("id", id)
      .select(
        "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
      );
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while updating contract", 500, "supabase");
    }

    if (data) return data[0];
    return undefined;
  }

  async function updateContractStatus(
    contractId: string,
    newStatus: string
  ): Promise<void> {
    const { data, error } = await supabase
      .from("contracts")
      .update({ contract_status: newStatus })
      .eq("id", contractId)
      .select(
        "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
      );
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while updating contract", 500, "supabase");
    }
  }

  async function contractAgreement(
    contractId: string,
    userAgreeing: "contractor" | "provider",
    newStatus?: string
  ): Promise<IContract> {
    if (userAgreeing === "provider") {
      const { data, error } = await supabase
        .from("contracts")
        .update({
          provider_agreed: true,
          contract_status: newStatus ?? undefined,
        })
        .eq("id", contractId)
        .select(
          "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
        );
      if (error) {
        console.log(JSON.stringify(error, null, 2));
        throw new AppError("ERROR while updating contract", 500, "supabase");
      }
      if (data) return data[0];
    }
    if (userAgreeing === "contractor") {
      const { data, error } = await supabase
        .from("contracts")
        .update({
          contractor_agreed: true,
          contract_status: newStatus ?? undefined,
        })
        .eq("id", contractId)
        .select(
          "*,service_id(*,service_images(*)),user_provider_id(*),user_contractor_id(*),messages(*)"
        );
      if (error) {
        console.log(JSON.stringify(error, null, 2));
        throw new AppError("ERROR while updating contract", 500, "supabase");
      }
      if (data) return data[0];
    }

    throw new AppError("ERROR while updating contract", 500, "supabase");
  }

  async function contractCancel(contractId: string): Promise<void> {
    const { data, error } = await supabase
      .from("contracts")
      .update({
        contract_status: "canceled",
      })
      .eq("id", contractId);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while canceling contract", 500, "supabase");
    }
  }

  async function contractExecuted(contractId: string): Promise<void> {
    const { data, error } = await supabase
      .from("contracts")
      .update({
        contract_status: "closed",
      })
      .eq("id", contractId);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while canceling contract", 500, "supabase");
    }
  }

  async function createNewReview(newReview: IServiceReview) {
    const { data, error } = await supabase.from("reviews").insert([newReview]);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while creating new review", 500, "supabase");
    }
  }

  async function activityLog(logData: IActivityLog): Promise<void> {
    const { data, error } = await supabase.from("log").insert([
      {
        event: logData.event,
        subject: logData.subject,
        data: logData.data,
        user_id: userProfile ? userProfile.id : "guest",
        user_provider: logData.user_provider,
      },
    ]);
  }

  async function removeImageFromService(
    serviceAdId: string,
    imagePath: string
  ): Promise<void> {
    const { data, error } = await supabase
      .from("service_images")
      .delete()
      .eq("serviceId", serviceAdId)
      .eq("imagePath", imagePath);

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while removing images from database",
        500,
        "supabase"
      );
    }
    return;
  }

  async function updateServiceAd(
    newData: ICreateServiceDTO
  ): Promise<IUserServiceAd> {
    const { data, error } = await supabase
      .from("services")
      .update({
        title: newData.title,
        description: newData.description,
        value: newData.value,
        valid_to: newData.validTo,
        valid_from: newData.validFrom,
        serviceTypeId: newData.serviceTypeId,
      })
      .eq("id", newData.id)
      .select();

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while updating database", 500, "supabase");
    }

    return data[0];
  }

  async function updateProfileImage(userId: string, newImagePath: string) {
    const { data, error } = await supabase
      .from("users")
      .update({
        image: newImagePath,
      })
      .eq("id", userId);

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while updating new image path on database",
        500,
        "supabase"
      );
    }
  }

  async function topServiceAds(): Promise<ITopServiceAds[] | undefined> {
    const { data, error } = await supabase
      .from("top_services_per_click")
      .select();
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while loading top service ads",
        500,
        "supabase"
      );
    }

    if (data.length === 0) return undefined;

    return data;
  }

  return (
    <DataContext.Provider
      value={{
        userProfile,
        isEmailAvailable,
        createNewAccount,
        loadUserProfile,
        updateProfile,
        setPhoneConfirmed,
        getDashboardData,
        getUserServiceAds,
        getAvailableServiceTypes,
        createServiceAd,
        updateServiceAdImages,
        search,
        getServiceAdById,
        createNewContract,
        createNewMessage,
        getUserContractedServices,
        getContractById,
        getUserProvidedServices,
        updateContract,
        contractAgreement,
        contractCancel,
        contractExecuted,
        createNewReview,
        activityLog,
        removeImageFromService,
        updateServiceAd,
        updateProfileImage,
        topServiceAds,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export {
  DataProvider,
  IContract,
  IContractMessage,
  IDashboardData,
  IServiceReview,
  IServiceType,
  ITopServiceAds,
  IUpdateContractDTO,
  IUserDTO,
  IUserServiceAd,
  useData,
};
