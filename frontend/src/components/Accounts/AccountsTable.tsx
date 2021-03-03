import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import QueryMultiSelectBtn from "components/Common/QueryMultiSelectBtn";
import QuerySortBtn, { Direction } from "components/Common/QuerySortBtn";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { IAccountDto } from "services/backend/nswagts";
import SelectType from "types/SelectType";

interface Props {
  className?: string;
  data: IAccountDto[];
  searchString: string;
}

const AccountsTable: FC<Props> = (props: Props) => {
  const { t, locale, localeNameMap } = useLocales();

  const [sortKey, setSortKey] = useState<keyof IAccountDto>("id");
  const [sortDirection, setSortDirection] = useState("ASC");

  const allKeyOptions: SelectType[] = [
    { name: t("accounts.id"), id: "id" },
    { name: t("accounts.name"), id: "name" },
    { name: t("accounts.email"), id: "email" },
    { name: t("accounts.tel"), id: "tel" },
    { name: t("accounts.cvrNumber"), id: "cvrNumber" }
  ];
  const [tableKeys, setTableKeys] = useState<SelectType[]>(allKeyOptions);

  const handleSortChange = useCallback((key: string, direction: Direction) => {
    if (direction != null) {
      setSortKey(key as keyof IAccountDto);
      setSortDirection(direction);
    } else {
      setSortKey("id");
      setSortDirection("ASC");
    }
  }, []);

  const sortComparer = useCallback(
    (a: IAccountDto, b: IAccountDto) => {
      const [c, d] = sortDirection == "ASC" ? [a[sortKey], b[sortKey]] : [b[sortKey], a[sortKey]];
      if (typeof c == "number" && typeof d == "number") {
        return c - d;
      }
      if (typeof c == "string" && typeof d == "string") {
        const cUpper = (c as string).toUpperCase();
        const dUpper = (d as string).toUpperCase();
        if (cUpper < dUpper) {
          return -1;
        } else if (cUpper > dUpper) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    [sortKey, sortDirection]
  );

  const filterCb = useCallback((qkey: string, chosenOptions: SelectType["id"][]) => {
    setTableKeys(allKeyOptions.filter(e => chosenOptions.includes(e.id)));
  }, []);

  const searchFilter = useCallback(
    (acc: IAccountDto) => {
      return (
        Object.entries(acc)
          //Filter away accounts that should not show due to filtering with multiSelectBtn.
          .filter(([key, value]) => tableKeys.some(tKey => tKey.id == key))
          //Search for a value that starts with the search string.
          .some(([key, value]) =>
            (value + "").toUpperCase().startsWith(props.searchString.toUpperCase())
          )
      );
    },
    [props.searchString, tableKeys]
  );

  return (
    <>
      <Flex>
        <Flex h="48px" alignItems="center">
          <QueryMultiSelectBtn queryKey="test" options={allKeyOptions} filterCb={filterCb} />
        </Flex>
        <Table>
          <Thead>
            <Tr>
              {tableKeys.map(key => (
                <Th key={key.id}>
                  <QuerySortBtn queryKey={key.id.toString()} sortCb={handleSortChange} mr={3} />
                  {key.name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {props.data
              .filter(acc => searchFilter(acc))
              .sort((a: IAccountDto, b: IAccountDto) => sortComparer(a, b))
              .map(account => {
                return (
                  <Tr key={account.id}>
                    {tableKeys.map(key => (
                      <Td key={key.id}>{account[key.id.toString() as keyof IAccountDto]}</Td>
                    ))}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};
export default AccountsTable;
