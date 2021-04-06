import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  StackDivider,
  Table,
  Tbody,
  Td,
  Text,
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
import StatementHeaderRow from "./oldComponents/statementHeaderRow";
import StatementHeaderRow2 from "./StatementHeaderRow2";
import StatementRow from "./statementRow";
import StatementRow2 from "./StatementRow2";
import StatementSection from "./StatementSection";
import StatementSection2 from "./StatementSection2";

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
        <StatementSection2 heading={t("statements.section1.heading")}>
          <StatementHeaderRow2 h1={t("statements.turnoverExlMoms")} h2={t("statements.taxIs")} />
          <StatementRow2 text={t("statements.section1.mushrooms")} tax="0.25" />
          <StatementRow2 text={t("statements.section1.tomatoCucumberHerbs")} tax="2.00" />
          <StatementRow2
            text={t("statements.boughtPlants")}
            subText={t("statements.section1.boughtPlantsDesc")}
            tax="2.00"
          />
        </StatementSection2>
      </Stack>
    </form>
  );
};
export default StatementForm;
/*
<Stack>
        <StatementSection2 heading={t("statements.section1.heading")}>
          <StatementHeaderRow2 h1={t("statements.turnoverExlMoms")} h2={t("statements.taxIs")} />
          <StatementRow2 text={t("statements.section1.mushrooms")} tax="0.25" />
          <StatementRow2 text={t("statements.section1.tomatoCucumberHerbs")} tax="2.00" />
          <StatementRow2
            text={t("statements.boughtPlants")}
            subText={t("statements.section1.boughtPlantsDesc")}
            tax="2.00"
          />
        </StatementSection2>
        <StatementSection heading={t("statements.section1.heading")}>
          <StatementHeaderRow h1={t("statements.turnoverExlMoms")} h2={t("statements.taxIs")} />
          <StatementRow text={t("statements.section1.mushrooms")} tax="0.25" />
          <StatementRow text={t("statements.section1.tomatoCucumberHerbs")} tax="2.00" />
          <StatementRow
            text={t("statements.boughtPlants")}
            subText={t("statements.section1.boughtPlantsDesc")}
            tax="2.00"
          />
        </StatementSection>
        <StatementSection heading={t("statements.section3.heading")}>
          <StatementRow text={t("statements.section3.carrot")} tax="3.00" />
          <StatementRow text={t("statements.section3.pea")} tax="3.00" />
          <StatementRow text={t("statements.section3.onion")} tax="3.00" />
          <StatementRow text={t("statements.other")} tax="3.00" />
          <StatementRow
            text={t("statements.boughtPlants")}
            subText={t("statements.section3.boughtPlantsDesc")}
            tax="3.00"
            tooltip="Yderligere beskrivelse af dette felt her..."
          />
        </StatementSection>
      </Stack>
*/

/* Section 1
<StatementFormSection heading={t("statements.section1.heading")}>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th w="30%">{t("statements.turnoverExlMoms")}</Th>
                <Th w="15%">{t("statements.taxIs")}</Th>
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
                <Td>
                  <Stack spacing={0}>
                    <Text>{t("statements.boughtPlants")}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {t("statements.section1.boughtPlantsDesc")}
                    </Text>
                  </Stack>
                </Td>
                <Td>
                  <InputDKK />
                </Td>
                <Td>2.00‰</Td>
              </Tr>
            </Tbody>
          </Table>
        </StatementFormSection>
*/

/*
<Box shadow="md" p={10}>
          <Stack>
            <StatementRow description="test" tax="3.00">
              <InputDKK />
            </StatementRow>
          </Stack>
        </Box>




  <Grid templateColumns="1fr 1fr 1fr">
        <GridItem bg="red">hej</GridItem>
        <GridItem bg="green">hej</GridItem>
        <GridItem bg="blue">hej</GridItem>
      </Grid>


<Stack>
        <StatementFormSection
          heading={t("statements.section1.heading")}
          templateColumns="1fr, 1fr, 1fr">
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

*/

/*
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
*/
