import { useAuth } from "hooks/useAuth";
import { createContext } from "react";
import { ILoginRequestDto } from "services/backend/nswagts";

type ContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<ContextType>({
  activeUser: false,
  authStage: 0,
  login: (loginRequest: ILoginRequestDto) => null,
  logout: () => null
});
