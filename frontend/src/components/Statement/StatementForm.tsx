import { Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";

import StatementSection from "./StatementSection";
import StatementSectionTable from "./StatementSectionTable";
import StatementTableRow from "./StatementTableRow";
import StatementTableSubHeading from "./StatementTableSubHeading";
import StatementTableSubHeadings from "./StatementTableSubHeadings";

interface Props {
  statement: IStatementDto;
}

const StatementForm: FC<Props> = ({ statement }) => {
  const { t } = useLocales();
  const { register, handleSubmit, watch, errors } = useForm();
  const [localForm, setLocalform] = useState<IStatementDto>(statement);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <StatementSection heading={t("statements.section1.heading")}>
          <StatementSectionTable>
            <StatementTableRow text={t("statements.section1.mushrooms")} tax="0.25" />
            <StatementTableRow text={t("statements.section1.tomatoCucumberHerbs")} tax="2.00" />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              subText={t("statements.section1.boughtPlantsDesc")}
              tax="2.00"
              tooltip="Tooltip her"
            />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section3.heading")}>
          <StatementSectionTable>
            <StatementTableRow text={t("statements.section3.carrot")} tax="3.00" />
            <StatementTableRow text={t("statements.section3.pea")} tax="3.00" />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              subText={t("statements.section3.boughtPlantsDesc")}
              tax="3.00"
            />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section4.heading")}>
          <StatementSectionTable>
            <StatementTableRow text={t("statements.section4.onions")} tax="1.60" />
            <StatementTableRow text={t("statements.section4.plants")} tax="1.60" />
            <StatementTableRow text={t("statements.section4.flowers")} tax="1.60" />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              subText={t("statements.section3.boughtPlantsDesc")}
              tax="1.60"
            />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section7.heading")}>
          <StatementSectionTable>
            <StatementTableRow text={t("statements.section7.plants")} tax="4.50" />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow text={t("statements.boughtPlants")} tax="4.50" />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section8.heading")}>
          <StatementSectionTable h1="" h2="" h3="">
            <StatementTableSubHeading>
              {t("statements.section8.subHeading1")}
            </StatementTableSubHeading>
            <StatementTableSubHeadings
              h2={t("statements.turnoverExlMoms")}
              h3={t("statements.taxIs")}
            />
            <StatementTableRow text={t("statements.section8.applesPearsOther")} tax="5.00" />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.section8.packagingCost")}
              subText={t("statements.section8.packagingCostDesc")}
              tax="5.00"
            />
            <StatementTableSubHeading>
              {t("statements.section8.subHeading2")}
            </StatementTableSubHeading>
            <StatementTableSubHeadings
              h2={t("statements.turnoverExlMoms")}
              h3={t("statements.taxIs")}
            />
            <StatementTableRow text={t("statements.section8.cherry")} tax="4.65" />
            <StatementTableRow text={t("statements.section8.plum")} tax="4.65" />
            <StatementTableRow text={t("statements.other")} tax="4.65" />
            <StatementTableSubHeading>
              {t("statements.section8.subHeading3")}
            </StatementTableSubHeading>
            <StatementTableSubHeadings
              h2={t("statements.turnoverExlMoms")}
              h3={t("statements.taxIs")}
            />
            <StatementTableRow text={t("statements.section8.currant")} tax="4.60" />
            <StatementTableRow text={t("statements.section8.strawberry")} tax="4.60" />
            <StatementTableRow text={t("statements.other")} tax="4.60" />
          </StatementSectionTable>
        </StatementSection>
      </Stack>
    </form>
  );
};
export default StatementForm;
