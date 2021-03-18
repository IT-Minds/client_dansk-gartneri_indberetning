import { Stack, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IAccountDto, RoleEnum } from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
}

const CurrentAccountant: FC<Props> = ({ account }) => {
  const { t } = useLocales();
  const accountant = account.users.find(u => u.role == RoleEnum.Accountant);

  return (
    <Stack>
      {accountant ? (
        <>
          <Text>
            {t("accounts.name")}: {accountant.name}
          </Text>
          <Text>
            {t("accounts.email")}: {accountant.email}
          </Text>
        </>
      ) : (
        <Text>Ingen revisor er tilknyttet denne kunde.</Text>
      )}
    </Stack>
  );
};
export default CurrentAccountant;
