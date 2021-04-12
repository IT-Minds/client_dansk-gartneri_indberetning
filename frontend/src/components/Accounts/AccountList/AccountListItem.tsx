import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
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
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
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
  const itemRef = useRef(null);

  return (
    <Flex shadow="sm" p={2} border="1px" borderColor={boxBorder} rounded="md" mb={2}>
      <AccordionItem w="100%" border="none" ref={itemRef}>
        {({ isExpanded }) => (
          <>
            <Flex justifyContent="space-between">
              <HStack spacing={5}>
                <Avatar size="sm" />
                <Text>{account.name}</Text>
              </HStack>
              <HStack>
                {!account.statements.some(s => s.revisionYear == accountingYear) && (
                  <InviteBtn account={account} accountingYear={accountingYear} />
                )}
                <ChangeAccountantModal account={account} />
                <AccordionButton
                  as={IconButton}
                  icon={isExpanded ? <BiChevronUp /> : <BiChevronDown />}
                  w={0}
                  p={0}></AccordionButton>
              </HStack>
            </Flex>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Flex>
  );
};
export default AccountListItem;
