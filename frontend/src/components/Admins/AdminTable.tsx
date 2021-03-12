import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IUserDto } from "services/backend/nswagts";

interface Props {
  data: IUserDto[];
  tableKeyIds: string[];
}

const AdminTable: FC<Props> = ({ data, tableKeyIds }) => {
  const { t, locale, localeNameMap } = useLocales();

  return (
    <Flex>
      <Table>
        <Thead>
          <Tr>
            {tableKeyIds.map(key => (
              <Th key={key}>{t(`accounts.${key}`)}</Th>
            ))}
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(admin => {
            return (
              <Tr key={admin.id}>
                {tableKeyIds.map(key => (
                  <Td key={key}>{admin[key as keyof IUserDto]}</Td>
                ))}
                <Td isNumeric={true}>
                  <Menu>
                    <MenuButton as={IconButton} icon={<FiChevronDown />} isRound={true} />
                    <MenuList>
                      <MenuItem>Slet</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};
export default AdminTable;
