import { AppError } from "@errors/AppError";
import { ReactNode, createContext, useContext } from "react";

interface PhoneVerifyProviderProps {
  children: ReactNode;
}

interface IPhoneVerifyContextProps {
  sendVerification(phone: string): Promise<void>;
  verifyOtp(otp: string, phone: string): Promise<void>;
}

const PhoneVerifyContext = createContext<IPhoneVerifyContextProps>(
  {} as IPhoneVerifyContextProps
);

function PhoneVerifyProvider({ children }: PhoneVerifyProviderProps) {
  async function sendVerification(phone: string): Promise<void> {
    console.log(
      `https://verify.twilio.com/v2/Services/${process.env.TWILIO_SERVICE}/Verifications`
    );
    try {
      const response = await fetch(
        `https://verify.twilio.com/v2/Services/${process.env.TWILIO_SERVICE}/Verifications`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(
                `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
              ),
          },
          body: new URLSearchParams({
            To: `+55${phone}`,
            Channel: "sms",
          }),
        }
      );
      console.log({ response });
      return;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new AppError("ERROR while creating new message", 500, "supabase");
    }
  }

  async function verifyOtp(otp: string, phone: string): Promise<void> {
    try {
      fetch(
        `https://verify.twilio.com/v2/Services/${process.env.TWILIO_SERVICE}/Verifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
              ),
          },
          body: `To=%2B55${phone}&Code=${otp}`,
        }
      );
    } catch (error) {}
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
