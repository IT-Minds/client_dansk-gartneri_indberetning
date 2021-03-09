import { Box, Button, Flex, Grid, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import Header from "components/Header/Header";
import BasicWrapper from "components/Layouts/BasicWrapper";
import HeaderLayout from "components/Layouts/HeaderLayout";
import { FC, useCallback, useContext, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountList from "./AccountList";

const Accounts: FC = () => {
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
          <AccountList data={accounts} />
        </BasicWrapper>
      }
    />
  );
};
export default Accounts;
