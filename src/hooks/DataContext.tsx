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

type IDashboardData = {
  servicesCount: number;
  contractsCount: number;
  visualisationsCount: number;
};

interface IDataContextProps {
  userProfile: IUserDTO | undefined;
  isEmailAvailable(email: string): Promise<boolean>;
  createNewAccount(newUser: IUserDTO): Promise<IUserDTO>;
  loadUserProfile(userId: string): Promise<IUserDTO>;
  updateProfile(userId: string, name: string, phone: string): Promise<void>;
  getDashboardData(): Promise<IDashboardData>;
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
    const { data: servicesData, error } = await supabase
      .from("services")
      .select("id")
      .eq("providerId", userProfile?.id);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR on dashboard data loading", 500, "supabase");
    }

    console.log(JSON.stringify(servicesData, null, 2));

    const dashboardData: IDashboardData = {
      contractsCount: 0,
      servicesCount: servicesData.length,
      visualisationsCount: 0,
    };
    return dashboardData;
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, IUserDTO, useData };
