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
import QuerySortBtn, { Direction } from "components/Common/QuerySortBtn";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { AccountDto, IAccountDto } from "services/backend/nswagts";

interface Props {
  className?: string;
  data: IAccountDto[];
}

const AccountList: FC<Props> = (props: Props) => {
  const { t, locale, localeNameMap } = useLocales();

  const [sortKey, setSortKey] = useState<keyof IAccountDto>("id");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [tableKeys, setTableKeys] = useState(["id", "name", "email", "tel", "cvrNumber"]);
  //Object.keys(new AccountDto())

  const handleSortChange = useCallback((key: string, direction: Direction) => {
    console.log(key);
    console.log(direction);
    setSortKey(key as keyof IAccountDto);
    setSortDirection(direction);
  }, []);

  const sortCb = useCallback(
    (a: IAccountDto, b: IAccountDto) => {
      const [c, d] = sortDirection == "ASC" ? [a, b] : [b, a];
      //console.log(sortKey);
      if (typeof a[sortKey] == "number") {
        //console.log("number!");
        return (c[sortKey] as number) - (d[sortKey] as number);
      }
      if (typeof a[sortKey] == "string") {
        //console.log("string!");
        const cValue = (c[sortKey] as string).toUpperCase();
        const dValue = (d[sortKey] as string).toUpperCase();
        if (cValue < dValue) {
          return -1;
        } else if (cValue > dValue) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    [sortKey, sortDirection]
  );

  return (
    <Table>
      <Thead>
        <Tr>
          {tableKeys.map(key => (
            <Th key={key}>
              <QuerySortBtn queryKey={key} sortCb={handleSortChange} />
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {props.data
          .sort((a: IAccountDto, b: IAccountDto) => sortCb(a, b))
          .map(account => {
            return (
              <Tr key={account.id}>
                {tableKeys.map(key => (
                  <Td key={key}>{account[key as keyof IAccountDto]}</Td>
                ))}
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};
export default AccountList;

/*
.sort((a: IAccountDto, b: IAccountDto) =>
            sortDirection == "ASC"
              ? (a[sortKey as keyof IAccountDto] as any) - (b[sortKey as keyof IAccountDto] as any)
              : (b[sortKey as keyof IAccountDto] as any) - (a[sortKey as keyof IAccountDto] as any)
          )


<Td>{account.id}</Td>
                <Td>{account.name}</Td>
                <Td>{account.email}</Td>
                <Td>{account.tel}</Td>
                <Td>{account.cvrNumber}</Td>





<Th>
            {t("accounts.id")}
            <QuerySortBtn queryKey={"id"} sortCb={handleSortChange} />
          </Th>
          <Th>
            {t("accounts.name")}
            <QuerySortBtn queryKey="id" sortCb={handleSortChange} />
          </Th>
          <Th>
            {t("accounts.email")}
            <QuerySortBtn queryKey="id" sortCb={handleSortChange} />
          </Th>
          <Th>
            {t("accounts.tel")}
            <QuerySortBtn queryKey="id" sortCb={handleSortChange} />
          </Th>
          <Th>
            {t("accounts.cvr")}
            <QuerySortBtn queryKey="id" sortCb={handleSortChange} />
          </Th>



<Th>{t("accounts.address1")}</Th>
          <Th>{t("accounts.address2")}</Th>

<Td>{account.address1}</Td>
              <Td>{account.address2}</Td>
*/
