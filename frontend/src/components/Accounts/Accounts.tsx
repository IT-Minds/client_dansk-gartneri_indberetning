import { Box, Button, Flex, Grid, Heading, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import Header from "components/Header/Header";
import BasicWrapper from "components/Layouts/BasicWrapper";
import HeaderLayout from "components/Layouts/HeaderLayout";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountList from "./AccountList";

const Accounts: FC = () => {
  const { t } = useLocales();

  const [accounts, dispatchAccounts] = useReducer(ListReducer<IAccountDto>("id"), []);

  const fetchData = useCallback(async () => {
    try {
      const accountClient = await genAccountClient();
      const data = await accountClient.getAllClients();

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
            <Heading>{t("accounts.accounts")}</Heading>
            <AccountList data={accounts} />
          </Stack>
        </BasicWrapper>
      }
    />
  );
};
export default Accounts;
