import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import { api } from "@services/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWarmUpBrowser } from "./warmUpBrowser";

interface AppAuthProviderProps {
  children: ReactNode;
}

type SessionUser = {
  userId: string;
  name: string;
  email: string;
  image: string;
};

type AuthContextData = {
  appSignIn(): Promise<void>;
  appSignOut(): Promise<void>;
  status: "authenticated" | "loading" | "unauthenticated";
  session: SessionUser | undefined;
};

const AppAuthContext = createContext({} as AuthContextData);

function AppAuthProvider({ children }: AppAuthProviderProps) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const [sessionStatus, setSessionStatus] = useState<
    "authenticated" | "loading" | "unauthenticated"
  >("unauthenticated");

  const [sessionUser, setSessionUser] = useState<SessionUser>();

  useEffect(() => {
    async function loadUserProfile() {
      setSessionStatus("loading");
      try {
        const response = await api.get(
          `users/${user?.primaryEmailAddress?.emailAddress}`
        );
        setSessionUser({
          userId: response.data.id,
          email: response.data.email,
          name: response.data.name,
          image: response.data.image,
        });
        console.log("Auth loaded profile!");
      } catch (error) {
        console.log({ error });
      }
    }
    if (sessionId) {
      loadUserProfile();
      setSessionStatus("authenticated");
    }
  }, []);

  async function appSignIn() {
    setSessionStatus("loading");
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        setSessionStatus("authenticated");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
      setSessionStatus("unauthenticated");
    }
  }

  async function appSignOut() {
    try {
      signOut();
      setSessionStatus("unauthenticated");
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <AppAuthContext.Provider
      value={{
        appSignIn,
        appSignOut,
        status: sessionStatus,
        session: sessionUser,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
}

function appUseAuth() {
  return useContext(AppAuthContext);
}

export { AppAuthProvider, appUseAuth };
