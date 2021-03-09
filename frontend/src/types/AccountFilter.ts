import { IAccountDto } from "services/backend/nswagts";

export type AccountFilter = {
  id: string;
  predicate: (account: IAccountDto, textInput?: string) => boolean;
};
