import { IconButton, Tooltip } from "@chakra-ui/react";
import { AccountsContext } from "contexts/AccountsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext } from "react";
import { MdAssignment } from "react-icons/md";
import { genStatementClient } from "services/backend/apiClients";
import { CreateStatementCommand, IAccountDto } from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  accountingYear: number;
}

const SeeStatementBtn: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();

  //TODO: Implement functionality

  return (
    <Tooltip label="Se besvarelse">
      <IconButton aria-label="Read statement" icon={<MdAssignment />} />
    </Tooltip>
  );
};
export default SeeStatementBtn;
