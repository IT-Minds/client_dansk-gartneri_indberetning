import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { IAccountDto } from "services/backend/nswagts";

interface Props {
  className?: string;
  data: IAccountDto[];
}

const AccountList: FC<Props> = (props: Props) => {
  const { t, locale, localeNameMap } = useLocales();

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{t("accounts.id")}</Th>
          <Th>{t("accounts.name")}</Th>
          <Th>{t("accounts.email")}</Th>
          <Th>{t("accounts.tel")}</Th>
          <Th>{t("accounts.cvr")}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map(account => {
          return (
            <Tr key={account.id}>
              <Td>{account.id}</Td>
              <Td>{account.name}</Td>
              <Td>{account.email}</Td>
              <Td>{account.tel}</Td>
              <Td>{account.cvrNumber}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
export default AccountList;

/*

<Th>{t("accounts.address1")}</Th>
          <Th>{t("accounts.address2")}</Th>

<Td>{account.address1}</Td>
              <Td>{account.address2}</Td>
*/
