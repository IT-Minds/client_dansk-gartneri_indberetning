import { Box, Heading } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const StatementSection: FC<Props> = ({ heading, children }) => {
  const { t } = useLocales();

  return (
    <Box shadow="sm" p={10} border="1px" borderColor="gray.200" rounded="md">
      <Heading size="md">{heading}</Heading>
      {children}
    </Box>
  );
};
export default StatementSection;
