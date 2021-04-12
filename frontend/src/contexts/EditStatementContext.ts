import { createContext, Dispatch, SetStateAction } from "react";
import { IStatementDto } from "services/backend/nswagts";

type ContextType = {
  save: () => void;
  isSaving: boolean;
  submit: () => void;
};

export const EditStatementContext = createContext<ContextType>({
  save: () => null,
  isSaving: false,
  submit: () => null
});

