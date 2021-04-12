import { Button, Flex, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SearchFilter } from "components/Accounts/Filters/AccountFilters";
import QueryMultiSelectBtn from "components/Common/QueryMultiSelectBtn";
import QuerySortBtn, { Direction } from "components/Common/QuerySortBtn";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IAccountDto } from "services/backend/nswagts";
import { AccountFilter } from "types/AccountFilter";
import SelectType from "types/SelectType";

import AccountListItem from "./AccountListItem";

interface Props {
  data: IAccountDto[];
  accountingYear: number;
}

const AccountList: FC<Props> = ({ data, accountingYear }) => {
  const { t, locale, localeNameMap } = useLocales();

  return (
    <Stack spacing={2}>
      {data.map(account => (
        <AccountListItem key={account.id} account={account} accountingYear={accountingYear} />
      ))}
    </Stack>
  );
};
export default AccountList;
