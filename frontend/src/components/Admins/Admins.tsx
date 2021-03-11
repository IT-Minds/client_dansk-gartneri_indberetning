import { Flex, Heading, Stack } from "@chakra-ui/react";
import EntityTable from "components/Common/EntityTable";
import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const Admins: FC = () => {
  const { t } = useLocales();

  const [accounts, dispatchAccounts] = useReducer(ListReducer<IAccountDto>("id"), []);
  const [searchString, setSearchString] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      const accountClient = await genAccountClient();
      const data = await accountClient.getAllAccounts();

      console.log(data);

      if (data && data.length > 0)
        dispatchAccounts({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BasicLayout>
      <Stack spacing={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>{t("accounts.accounts")}</Heading>
        </Flex>
        <EntityTable
          data={accounts}
          searchString={searchString}
          tableKeyIds={["id", "name", "tel", "email"]}
        />
      </Stack>
    </BasicLayout>
  );
};
export default Admins;
