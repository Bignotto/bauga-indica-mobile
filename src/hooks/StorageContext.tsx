import { AppError } from "@errors/AppError";
import supabase from "@services/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { ReactNode, createContext, useContext } from "react";

interface StorageProviderProps {
  children: ReactNode;
}

type IUploadFile = {
  name: string;
  path: string;
};

interface IStorageContextProps {
  upload(files: IUploadFile | IUploadFile[]): Promise<string[] | undefined>;
  remove(files: IUploadFile | IUploadFile[]): Promise<void>;
  profileImageUpload(file: IUploadFile): Promise<string>;
}

const StorageContext = createContext<IStorageContextProps>(
  {} as IStorageContextProps
);

function StorageProvider({ children }: StorageProviderProps) {
  async function upload(
    files: IUploadFile | IUploadFile[]
  ): Promise<string[] | undefined> {
    const filesArray = Array.isArray(files) ? [...files] : [files];
    const returnArray = [];

    for (const file of filesArray) {
      const base64 = await FileSystem.readAsStringAsync(file.path, {
        encoding: "base64",
      });
      const { data, error } = await supabase.storage
        .from("images_services")
        .upload(`${file.name}.jpeg`, decode(base64), {
          contentType: "image/jpeg",
        });

      if (error) {
        console.log(JSON.stringify(error, null, 2));
        throw new AppError("ERROR while uploading image.", 500, "supabase");
      }

      returnArray.push(data.path);
    }

    return returnArray.length > 0 ? returnArray : undefined;
  }

  async function remove(files: IUploadFile | IUploadFile[]) {
    const filesArray = Array.isArray(files) ? [...files] : [files];
    const returnArray = [];

    const { data, error } = await supabase.storage
      .from("images_services")
      .remove(filesArray.map((f) => f.name));
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while deleting image", 500, "supabase");
    }
    return;
  }

  async function profileImageUpload(file: IUploadFile) {
    const base64 = await FileSystem.readAsStringAsync(file.path, {
      encoding: "base64",
    });
    const { data, error } = await supabase.storage
      .from("images_avatars")
      .upload(`${file.name}.jpeg`, decode(base64), {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while uploading image.", 500, "supabase");
    }

    return data.path;
  }

  return (
    <StorageContext.Provider
      value={{
        upload,
        remove,
        profileImageUpload,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

//-------------------------

function useStorage() {
  return useContext(StorageContext);
}

export { StorageProvider, useStorage };
