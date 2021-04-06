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
import { IClientStatementDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementForm from "./StatementForm";

interface Props {}

const FormPage: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);
  const [statements, setStatements] = useState<IClientStatementDto[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getClientStatements();

      console.log(data);

      if (data && data.length > 0) setStatements(data);
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
      <StatementForm statement={statements[0]}></StatementForm>
    </BasicLayout>
  );
};
export default FormPage;
