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
import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementForm from "./StatementForm";

interface Props {}

const FormPage: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const [statement, setStatement] = useState<IStatementDto>([]);

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const year = router.query.accountingYear[0];
      const data = await statementClient.getStatement(parseInt(year));

      if (data != null) setStatement(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BasicLayout>
      <StatementForm statement={statement} />
    </BasicLayout>
  );
};
export default FormPage;
