import { Box, Flex, Heading, HStack, Select, Spinner, Stack, Text } from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { AccountsContext } from "contexts/AccountsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient, genStatementClient } from "services/backend/apiClients";
import { CreateStatementCommand, IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountsTable from "./AccountsTable";
import NewAccountModal from "./NewAccountModal";
import SearchFilterInput from "./SearchFilterInput";

const Accounts: FC = () => {
  const { t } = useLocales();

  const [accounts, dispatchAccounts] = useReducer(ListReducer<IAccountDto>("id"), []);
  const [isFetching, setIsFetching] = useState(false);
  const [searchString, setSearchString] = useState<string>("");
  const [accountingYear, setAccountingYear] = useState<number>(2021);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
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
    setIsFetching(false);
  }, []);

  const handleRequestStatement = useCallback(
    async (account: IAccountDto) => {
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
    },
    [accountingYear]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const accountingYears = useMemo(() => {
    return accounts.reduce((res: Set<number>, a: IAccountDto) => {
      a.statements.forEach(s => res.add(s.revisionYear));
      return res;
    }, new Set());
  }, [accounts]);

  return (
    <AccountsContext.Provider
      value={{
        accounts: accounts,
        dispatchAccounts: dispatchAccounts,
        fetchData: fetchData,
        isFetching: isFetching
      }}>
      <BasicLayout>
        <Stack spacing={4}>
          <Heading>{t("accounts.accounts")}</Heading>
          <Flex justifyContent="space-between" alignItems="center">
            <Select placeholder="Vælg revisionsår" w="max-content">
              {Array.from(accountingYears).map(year => (
                <option key={year} value={year + ""}>
                  {year}
                </option>
              ))}
            </Select>
            <HStack spacing={5}>
              <Box>
                <SearchFilterInput onChange={setSearchString} value={searchString} />
              </Box>
              <NewAccountModal onSubmit={fetchData} />
            </HStack>
          </Flex>
          <HStack h="20px" alignItems="center">
            {isFetching && (
              <>
                <Spinner size="sm" />
                <Text>{t("accounts.fetching")}</Text>
              </>
            )}
          </HStack>
          <AccountsTable
            data={accounts}
            accountingYear={accountingYear}
            searchString={searchString}
            fetchData={fetchData}
            requestStatement={handleRequestStatement}
          />
        </Stack>
      </BasicLayout>
    </AccountsContext.Provider>
  );
};
export default Accounts;
