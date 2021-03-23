import { Stack, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IUserAccountIdDto } from "services/backend/nswagts";

interface Props {
  accountant: IUserAccountIdDto;
}

const CurrentAccountant: FC<Props> = ({ accountant }) => {
  const { t } = useLocales();

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
        <Text>{t("accountant.noAccountant")}</Text>
      )}
    </Stack>
  );
};
export default CurrentAccountant;
