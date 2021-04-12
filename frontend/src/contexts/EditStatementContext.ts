import { createContext } from "react";

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
