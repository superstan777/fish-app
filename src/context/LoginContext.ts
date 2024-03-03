import { createContext } from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

// interface ContextProviderProps {
//   children: ReactNode;
// }
// export const LoginContextProvider: React.FC<ContextProviderProps> = ({
//   children,
// }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };
