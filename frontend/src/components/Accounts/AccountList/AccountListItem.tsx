import {
  Avatar,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { IAccountDto, IUserAccountIdDto } from "services/backend/nswagts";

import ChangeAccountantModal from "../ChangeAccountant/ChangeAccountantModal";
import InviteBtn from "./AccountListItemButtons/InviteBtn";

interface Props {
  account: IAccountDto;
  accountingYear: number;
}

const AccountListItem: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  return (
    <Flex
      shadow="sm"
      p={2}
      border="1px"
      borderColor={boxBorder}
      rounded="md"
      justifyContent="space-between">
      <HStack spacing={5}>
        <Avatar size="sm" />
        <Text>{account.name}</Text>
      </HStack>
      {!account.statements.some(s => s.revisionYear == accountingYear) && (
        <InviteBtn account={account} accountingYear={accountingYear} />
      )}
      <ChangeAccountantModal account={account} />
    </Flex>
  );
};
export default AccountListItem;
