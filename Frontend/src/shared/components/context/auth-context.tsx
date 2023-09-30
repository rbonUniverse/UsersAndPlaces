import { createContext } from "react";

const authContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default authContext;
