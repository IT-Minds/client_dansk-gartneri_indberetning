import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useMemo, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IAccountDto, StatementStatus } from "services/backend/nswagts";

import ChangeAccountantModal from "../ChangeAccountant/ChangeAccountantModal";
import InviteBtn from "./AccountListItemButtons/InviteBtn";
import RemindBtn from "./AccountListItemButtons/RemindBtn";
import SeeStatementBtn from "./AccountListItemButtons/SeeStatementBtn";
import StatusBadge from "./StatusBadge";

interface Props {
  account: IAccountDto;
  accountingYear: number;
}

const AccountListItem: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();
  const itemRef = useRef(null);

  const statement = useMemo(() => {
    return account.statements.find(s => s.revisionYear == accountingYear);
  }, [account.statements, accountingYear]);

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
                {!statement && <InviteBtn account={account} accountingYear={accountingYear} />}
                {statement && statement.status != StatementStatus.SignedOff && <RemindBtn />}
                {statement && statement.status == StatementStatus.SignedOff && (
                  <SeeStatementBtn account={account} accountingYear={accountingYear} />
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
