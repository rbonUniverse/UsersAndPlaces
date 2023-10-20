import { createContext } from "react";

interface authContextInterface {
  isLoggedIn: boolean;
  userId: string;
  login: (userId: string) => void;
  logout: () => void;
}

const authContext = createContext<authContextInterface>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

export default authContext;
