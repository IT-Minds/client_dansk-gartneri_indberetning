import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuCommand,
  MenuDivider,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text
} from "@chakra-ui/react";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IAccountDto } from "services/backend/nswagts";

import AddNewAccountantForm from "./ChangeAccountant/AddNewAccountantForm";
import ChangeAccountantModal from "./ChangeAccountant/ChangeAccountantModal";

interface Props {
  account: IAccountDto;
}

const AccountOptionsMenu: FC<Props> = ({ account }) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<BiChevronDown />} isRound={true}></MenuButton>
      <MenuList>
        <ChangeAccountantModal account={account} variant="link" />
      </MenuList>
    </Menu>
  );
};
export default AccountOptionsMenu;
