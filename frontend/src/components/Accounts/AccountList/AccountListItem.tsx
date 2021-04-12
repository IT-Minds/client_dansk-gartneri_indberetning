import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  Avatar,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  Tooltip
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
import StatusBadge from "./StatusBadge";

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
                <StatusBadge account={account} accountingYear={accountingYear} />
                {!account.statements.some(s => s.revisionYear == accountingYear) && (
                  <InviteBtn account={account} accountingYear={accountingYear} />
                )}
                <ChangeAccountantModal account={account} />
                <Tooltip label={isExpanded ? "Skjul info" : "Vis info"}>
                  <AccordionButton
                    as={IconButton}
                    icon={isExpanded ? <BiChevronUp /> : <BiChevronDown />}
                    w={0}
                    p={0}></AccordionButton>
                </Tooltip>
              </HStack>
            </Flex>
            <AccordionPanel p="0" mb="10px">
              <Stack spacing={0} pl="52px" w="max-content">
                <Divider mb={3} />
                <Text>CVR: {account.cvrNumber}</Text>
                <Text>Email: {account.email}</Text>
                <Text>Tlf: {account.tel}</Text>
                <Text>
                  Adresse:
                  {` ${account.address.addressLine1} ${account.address.addressLine2} ${account.address.addressLine3} ${account.address.addressLine4}`}
                </Text>
              </Stack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Flex>
  );
};
export default AccountListItem;
