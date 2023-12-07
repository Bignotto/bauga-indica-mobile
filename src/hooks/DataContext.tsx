import { AppError } from "@errors/AppError";
import supabase from "@services/supabase";
import { ReactNode, createContext, useContext } from "react";

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

interface IDataContextProps {
  isEmailAvailable(email: string): Promise<boolean>;
  createNewAccount(newUser: IUserDTO): Promise<IUserDTO>;
  loadUserProfile(userId: string): Promise<IUserDTO>;
}

const DataContext = createContext({} as IDataContextProps);

function DataProvider({ children }: DataProviderProps) {
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
    console.log({ message: "create new user", newUser });
    const { data, error } = await supabase.from("users").insert([newUser]);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError(
        "ERROR while saving new user into database",
        500,
        "supabase"
      );
    }

    return data![0];
  }

  async function loadUserProfile(userId: string) {
    console.log({ message: "load user profile", userId });
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while loading user profile", 500, "supabase");
    }

    return data![0];
  }

  return (
    <DataContext.Provider
      value={{
        isEmailAvailable,
        createNewAccount,
        loadUserProfile,
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
