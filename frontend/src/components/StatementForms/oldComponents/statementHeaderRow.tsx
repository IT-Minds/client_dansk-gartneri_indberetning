import {
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
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";

interface Props {
  h1: string;
  h2: string;
}

const StatementHeaderRow: FC<Props> = ({ h1, h2 }) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <Grid
      templateColumns="5fr 3fr 1fr"
      p={5}
      alignItems="center"
      w="100%"
      textTransform="uppercase"
      fontWeight="bold"
      textColor="gray.600"
      fontSize="sm">
      <Text></Text>
      <Text>{h1}</Text>
      <Text>{h2}</Text>
    </Grid>
  );
};
export default StatementHeaderRow;
