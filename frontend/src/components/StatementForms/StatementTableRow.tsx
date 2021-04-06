import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Td,
  Text,
  Tr
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, ReactNode, useContext } from "react";
import { BsInfoCircle } from "react-icons/bs";

import InputDKK from "./InputDKK";

interface Props {
  text: string;
  subText?: string;
  tax: string;
  children?: ReactNode;
  tooltip?: string;
}

const StatementTableRow: FC<Props> = ({ text, subText, tax, children, tooltip }) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <Tr>
      <Td>
        <HStack>
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
          <Stack spacing={0}>
            <Text>{text}</Text>
            <Text fontSize="sm" color="gray.500">
              {subText}
            </Text>
          </Stack>
        </HStack>
      </Td>
      <Td>
        <InputDKK />
      </Td>
      <Td>{tax}‰</Td>
    </Tr>
  );
};
export default StatementTableRow;
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
