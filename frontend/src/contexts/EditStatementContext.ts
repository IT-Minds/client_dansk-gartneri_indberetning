import { createContext } from "react";
import { IStatementDto } from "services/backend/nswagts";

type ContextType = {
  save: () => void;
  isSaving: boolean;
  submit: (data: IStatementDto) => Promise<void>;
};

export const EditStatementContext = createContext<ContextType>({
  save: () => null,
  isSaving: false,
  submit: (data: IStatementDto) => null
});
