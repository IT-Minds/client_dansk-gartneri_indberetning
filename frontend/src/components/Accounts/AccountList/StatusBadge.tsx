import {
  Box,
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
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IAccountDto, StatementStatus } from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  accountingYear: number;
}

const StatusBadge: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();
  const { statusNotSent, statusIsSent, statusIsEdited, statusIsSigned } = useColors();

  const genStatus: { msg: string; color: string } = useMemo(() => {
    const statement = account.statements.find(s => s.revisionYear == accountingYear);
    if (statement) {
      switch (statement.status) {
        case StatementStatus.InvitedNotEdited:
          return { msg: "Sendt", color: statusIsSent };
        case StatementStatus.InvitedAndEdited:
          return { msg: "Redigeret", color: statusIsEdited };
        case StatementStatus.SignedOff:
          return { msg: "Sendt", color: statusIsSigned };
      }
    } else {
      return { msg: "Ej afsendt", color: statusNotSent };
    }
  }, [account.statements, accountingYear]);

  return (
    <Flex
      rounded="md"
      background={genStatus.color}
      h="40px"
      w="100px"
      p="10px"
      justifyContent="center"
      alignItems="center">
      <Text fontSize="xs" fontWeight="bold">
        {genStatus.msg.toUpperCase()}
      </Text>
    </Flex>
  );
};
export default StatusBadge;
