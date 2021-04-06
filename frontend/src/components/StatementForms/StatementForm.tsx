import {
  Box,
  Container,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IClientStatementDto, IStatementFieldInputDto } from "services/backend/nswagts";

import InputDKK from "./InputDKK";
import StatementFormSection from "./StatementFormSection";

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
        <StatementFormSection heading={t("statements.section1.heading")}>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>{t("statements.turnoverExlMoms")}</Th>
                <Th>{t("statements.taxIs")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{t("statements.section1.mushrooms")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>0.25‰</Td>
              </Tr>
              <Tr>
                <Td>{t("statements.section1.tomatoCucumberHerbs")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>2.00‰</Td>
              </Tr>
              <Tr>
                <Td>{t("statements.section1.boughtPlants")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>2.00‰</Td>
              </Tr>
            </Tbody>
          </Table>
        </StatementFormSection>
        <StatementFormSection heading={t("statements.section3.heading")}>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>{t("statements.section3.turnoverExlPotatoes")}</Th>
                <Th>{t("statements.taxIs")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{t("statements.section3.carrot")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>3.00‰</Td>
              </Tr>
              <Tr>
                <Td>{t("statements.section3.pea")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>3.00‰</Td>
              </Tr>
              <Tr>
                <Td>{t("statements.section3.onion")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>3.00‰</Td>
              </Tr>
              <Tr>
                <Td>{t("statements.other")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>3.00‰</Td>
              </Tr>
              <Tr>
                <Td>{t("statements.section3.boughtPlants")}</Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>3.00‰</Td>
              </Tr>
            </Tbody>
          </Table>
        </StatementFormSection>
      </Stack>
    </form>
  );
};
export default StatementForm;
