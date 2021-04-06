import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  SystemProps,
  Table,
  Text,
  Th,
  Tr
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

import InputDKK from "./InputDKK";

interface Props {
  text: string;
  subText?: string;
  tax: string;
  children?: ReactNode;
  tooltip?: string;
}

const StatementRow: FC<Props> = ({ text, subText, tax, children, tooltip }) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <Grid templateColumns="5fr 3fr 1fr" p={5} alignItems="center">
      <Stack spacing={0}>
        <Text>{text}</Text>
        <Text fontSize="sm" color="gray.500">
          {subText}
        </Text>
      </Stack>
      <InputDKK />
      <Text marginLeft={10}>{tax}‰</Text>
    </Grid>
  );
};
export default StatementRow;
/*
<Box>
        {tooltip && (
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="info"
                icon={<BsInfoCircle size="20px" />}
                isRound={true}
                w="0"
                size="sm"
                variant="ghost"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{tooltip}</PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Box>
*/
