import { createContext, Dispatch, SetStateAction } from "react";
import { IStatementDto } from "services/backend/nswagts";

type ContextType = {
  save: () => void;
  isSaving: boolean;
  submit: () => void;
};

export const EditStatementContext = createContext<ContextType>(null);
/*
type ContextType = {
  fetchStatement: () => Promise<void>;
  statement: IStatementDto;
  setStatement: Dispatch<SetStateAction<IStatementDto>>;
  save: () => void;
  isSaving: boolean;
  submit: () => void;
};
*/
