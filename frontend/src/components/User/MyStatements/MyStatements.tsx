import { Box, Button, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto, StatementStatus } from "services/backend/nswagts";
import { logger } from "utils/logger";

const MyStatements: FC = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);
  const [account, setAccount] = useState<IAccountDto>();

  const fetchData = useCallback(async () => {
    try {
      const accountClient = await genAccountClient();
      const data = await accountClient.getAccount();

      if (data != null) setAccount(data);
      else logger.info("accountclient.get no data");
    } catch (err) {
      logger.warn("accountclient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const genStatus = useCallback((status: StatementStatus) => {
    switch (status) {
      case 0:
        return "Ikke besvaret";
      case 1:
        return "Besvaret";
    }
  }, []);

  return (
    <BasicLayout maxW="80vw">
      <Heading mb={10}>Indberetninger</Heading>
      <Box p={10} shadow="md" rounded="md">
        <Table>
          <Thead>
            <Tr>
              <Th>Revisionsår</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {account &&
              account.statements.map(statement => (
                <Tr key={statement.id}>
                  <Td>{statement.revisionYear}</Td>
                  <Td>{genStatus(statement.status)}</Td>
                  <Td>
                    {statement.status == 0 && (
                      <Link href={`/statement/${encodeURIComponent(statement.revisionYear)}`}>
                        <Button colorScheme="green" rounded="full">
                          Besvar
                        </Button>
                      </Link>
                    )}
                    {statement.status == 1 && <Button rounded="full">Se besvarelse</Button>}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </BasicLayout>
  );
};
export default MyStatements;
//onClick={e => router.push("statement/" + statement.revisionYear)}>
