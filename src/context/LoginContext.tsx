import { createContext } from "react";

interface LoginInterface {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
export const LoginContext = createContext<LoginInterface | false>(false);
