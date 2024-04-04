import { ReactNode, createContext } from "react";

interface PhoneVerifyProviderProps {
  children: ReactNode;
}

interface IPhoneVerifyContextProps {
  sendVerification(phone: string): Promise<void>;
  verifyOtp(otp: string): Promise<void>;
}

const PhoneVerifyContext = createContext<IPhoneVerifyContextProps>(
  {} as IPhoneVerifyContextProps
);

function PhoneVerifyProvider({ children }: PhoneVerifyProviderProps) {
  async function sendVerification(phone: string): Promise<void> {
    try {
    } catch (error) {}
  }

  return (
    <PhoneVerifyContext.Provider value={{}}>
      {children}
    </PhoneVerifyContext.Provider>
  );
}
