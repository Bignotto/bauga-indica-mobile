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
  status: "authenticated" | "unauthenticated";
  session: SessionUser | undefined;
  isLoading: boolean;
};

const AppAuthContext = createContext({} as AuthContextData);

function AppAuthProvider({ children }: AppAuthProviderProps) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { userId, signOut, sessionId } = useAuth();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [sessionStatus, setSessionStatus] = useState<
    "authenticated" | "unauthenticated"
  >("unauthenticated");

  const [sessionUser, setSessionUser] = useState<SessionUser>();

  useEffect(() => {
    async function loadUserProfile() {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    if (sessionId) {
      loadUserProfile();
      setSessionStatus("authenticated");
    }
  }, [sessionStatus]);

  async function appSignIn() {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  async function appSignOut() {
    try {
      signOut();
      setSessionStatus("unauthenticated");
      setSessionUser(undefined);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppAuthContext.Provider
      value={{
        appSignIn,
        appSignOut,
        status: sessionStatus,
        session: sessionUser,
        isLoading,
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
