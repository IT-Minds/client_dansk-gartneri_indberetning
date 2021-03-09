import { IAccountDto } from "services/backend/nswagts";
import { AccountFilter } from "types/AccountFilter";

export const SearchFilter: AccountFilter = {
  id: 0,
  predicate: (acc: IAccountDto, textInput: string) =>
    Object.entries(acc).some(([key, value]) =>
      (value + "").toUpperCase().startsWith(textInput.toUpperCase())
    )
};
