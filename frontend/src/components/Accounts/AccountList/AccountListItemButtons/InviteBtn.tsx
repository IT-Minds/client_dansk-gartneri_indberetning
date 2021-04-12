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

const InviteBtn: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();
  const { fetchData } = useContext(AccountsContext);

  const onInvite = useCallback(async () => {
    try {
      const statementclient = await genStatementClient();
      await statementclient.createStatement(
        new CreateStatementCommand({
          accountId: account.id,
          revisionYear: accountingYear
        })
      );
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  }, [account, accountingYear]);

  return (
    <Tooltip label="Invitér til at udfylde oplysningsksema">
      <IconButton
        aria-label="Invite to fill out statement"
        icon={<MdAssignment />}
        onClick={e => onInvite()}
      />
    </Tooltip>
  );
};
export default InviteBtn;
