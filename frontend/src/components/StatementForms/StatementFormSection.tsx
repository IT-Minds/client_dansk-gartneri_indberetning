import { Box, Heading } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, ReactNode, useContext } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const StatementFormSection: FC<Props> = ({ heading, children }) => {
  const { t } = useLocales();

  return (
    <Box shadow="sm" p={10}>
      <Heading size="md">{heading}</Heading>
      {children}
    </Box>
  );
};
export default StatementFormSection;
