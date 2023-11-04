import { createContext } from "react";

interface AuthContextInterface {
  isLoggedIn?: boolean;
  token: boolean;
  userId: string;
  loginAndSignUp?: (
    userId: string,
    token: boolean,
    expirationData: Date
  ) => void;
  logout?: () => void;
}

const authContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  token: null,
  userId: null,
  loginAndSignUp: () => {},
  logout: () => {},
});

export default authContext;
