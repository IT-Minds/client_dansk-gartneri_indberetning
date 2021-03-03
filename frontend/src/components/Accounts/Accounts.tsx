import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Header from "components/Header/Header";
import BasicWrapper from "components/Layouts/BasicWrapper";
import HeaderLayout from "components/Layouts/HeaderLayout";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountsTable from "./AccountsTable";
import NewAccountModal from "./NewAccountModal";
import SearchFilterInput from "./SearchFilterInput";

const Accounts: FC = () => {
  const { t } = useLocales();
  const { buttonFont } = useColors();

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
    <HeaderLayout
      header={<Header />}
      main={
        <BasicWrapper className="wrapper">
          <Stack spacing={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading>{t("accounts.accounts")}</Heading>
              <NewAccountModal />
            </Flex>
            <SearchFilterInput onChange={setSearchString} value={searchString} />
            <AccountsTable data={accounts} searchString={searchString} />
          </Stack>
        </BasicWrapper>
      }
    />
  );
};
export default Accounts;
