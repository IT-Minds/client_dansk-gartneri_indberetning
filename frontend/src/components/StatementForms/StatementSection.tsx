import {
  Box,
  Grid,
  GridProps,
  Heading,
  ResponsiveValue,
  SimpleGrid,
  Stack,
  StackDivider,
  SystemProps,
  Table
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, ReactElement, ReactNode, useContext } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const StatementSection: FC<Props> = ({ heading, children }) => {
  const { t } = useLocales();

  return (
    <Box shadow="sm" p={10} border="1px" borderColor="gray.200" rounded="md">
      <Heading size="md">{heading}</Heading>
      <Grid templateColumns="5fr 3fr 1fr" gap={5} alignItems="center">
        {children}
      </Grid>
    </Box>
  );
};
export default StatementSection;
