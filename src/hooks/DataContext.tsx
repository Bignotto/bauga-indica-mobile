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
};

type IServiceType = {
  id: number;
  name?: string;
  description?: string;
};

type IDashboardData = {
  servicesCount: number;
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
  };
  serviceTypeId?: {
    id: number;
    name: string;
    description: string;
  };
};

type ICreateServiceDTO = {
  id?: string;
  title: string;
  description: string;
  value: number;
  validFrom: Date;
  validTo: Date;
  serviceTypeId: number;
  providerId: string;
};

interface IDataContextProps {
  userProfile: IUserDTO | undefined;
  isEmailAvailable(email: string): Promise<boolean>;
  createNewAccount(newUser: IUserDTO): Promise<IUserDTO>;
  loadUserProfile(userId: string): Promise<IUserDTO>;
  updateProfile(userId: string, name: string, phone: string): Promise<void>;
  getDashboardData(): Promise<IDashboardData>;
  getUserServiceAds(): Promise<IUserServiceAd[] | undefined>;
  getAvailableServiceTypes(): Promise<IServiceType[] | undefined>;
  createServiceAd(newService: ICreateServiceDTO): Promise<IUserServiceAd>;
  updateServiceAdImages(serviceId: string, images: string[]): Promise<void>;
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
        "ERROR while saving new user into database",
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

    const dashboardData: IDashboardData = {
      contractsCount: contractsData.length,
      servicesCount: servicesData.length,
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
        "ERROR while saving new user into database",
        500,
        "supabase"
      );
    }
  }

  return (
    <DataContext.Provider
      value={{
        userProfile,
        isEmailAvailable,
        createNewAccount,
        loadUserProfile,
        updateProfile,
        getDashboardData,
        getUserServiceAds,
        getAvailableServiceTypes,
        createServiceAd,
        updateServiceAdImages,
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
  IDashboardData,
  IServiceType,
  IUserDTO,
  IUserServiceAd,
  useData,
};
