import { Heading, Input, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IClientStatementDto, IStatementFieldInputDto } from "services/backend/nswagts";

interface Props {
  statement: IClientStatementDto;
}

const StatementForm: FC<Props> = ({ statement }) => {
  const { t } = useLocales();
  const { activeUser } = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const [localForm, setLocalform] = useState<IClientStatementDto>(statement);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Heading>1. Grøntsager i væksthus</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Omsætning excl. moms</Th>
              <Th>Afgiften udgør:</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Svampe</Td>
              <Td>
                <Input></Input>
              </Td>
              <Td>{localForm.statementFieldInputs[0].taxPerMille}%</Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
    </form>
  );
};
export default StatementForm;
