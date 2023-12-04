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
      throw new Error("ERROR while getting user by id");
    }

    if (data.length > 0) return false;

    return true;
  }

  async function createNewAccount(newUser: IUserDTO) {
    const user: IUserDTO = {
      name: "dunha",
      email: "dunha@gmail.com",
    };

    return user;
  }

  return (
    <DataContext.Provider
      value={{
        isEmailAvailable,
        createNewAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
