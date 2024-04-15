import { AppError } from "@errors/AppError";
import { api } from "@services/api";
import { ReactNode, createContext, useContext } from "react";

interface PhoneVerifyProviderProps {
  children: ReactNode;
}

interface IPhoneVerifyContextProps {
  sendVerification(phone: string): Promise<boolean>;
  verifyOtp(otp: string, phone: string): Promise<boolean>;
}

const PhoneVerifyContext = createContext({} as IPhoneVerifyContextProps);

function PhoneVerifyProvider({ children }: PhoneVerifyProviderProps) {
  async function sendVerification(phone: string): Promise<boolean> {
    try {
      const response = await api.post("/phone/send", {
        phone: `+55${phone}`,
      });

      if (response.status !== 200 && response.data.message !== "code sent")
        throw new AppError("ERROR while creating new message", 500, "supabase");

      return true;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while creating new message", 500, "supabase");
    }
  }

  async function verifyOtp(otp: string, phone: string): Promise<boolean> {
    try {
      const response = await api.post("/phone/verify", {
        phone: `+55${phone}`,
        otp,
      });

      if (response.data.message === "wrong otp")
        throw new AppError("Código de verificação errado.", 500, "supabase");

      if (response.status !== 200 && response.data.message !== "valid otp")
        throw new AppError("ERROR outro erro", 500, "supabase");

      return true;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while validating OTP", 500, "supabase");
    }
  }

  return (
    <PhoneVerifyContext.Provider
      value={{
        verifyOtp,
        sendVerification,
      }}
    >
      {children}
    </PhoneVerifyContext.Provider>
  );
}

function usePhoneVerification() {
  return useContext(PhoneVerifyContext);
}

export { PhoneVerifyProvider, usePhoneVerification };
