import { Button, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";
import { StatementKeys } from "types/StatementKeys";

import InputDKK from "./InputDKK";
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
  const { handleSubmit, watch, errors, control } = useForm();
  const [localForm, setLocalform] = useState<IStatementDto>(statement);

  const onSubmit = useCallback((data: IStatementDto) => {
    const formattedData = Object.keys(data).reduce(
      (attrs, key) => ({
        ...attrs,
        [key]:
          typeof data[key as keyof IStatementDto] === "string" &&
          parseInt(data[key as keyof IStatementDto] as string)
      }),
      {}
    );
    console.log(formattedData);
  }, []);

  const formKeys: StatementKeys = {
    s1_mushrooms: "s1_mushrooms",
    s1_tomatoCucumberHerb: "s1_tomatoCucumberHerb",
    s1_boughtPlants: "s1_boughtPlants",
    s3_carrots: "s3_carrots",
    s3_peas: "s3_peas",
    s3_onions: "s3_onions",
    s3_other: "s3_other",
    s3_boughtPlants: "s3_boughtPlants",
    s4_onions: "s4_onions",
    s4_plants: "s4_plants",
    s4_cutFlowers: "s4_cutFlowers",
    s4_boughtPlants: "s4_boughtPlants",
    s7_plants: "s7_plants",
    s7_boughtPlants: "s7_boughtPlants",
    s8_applesPearsEtc: "s8_applesPearsEtc",
    s8_packaging: "s8_packaging",
    s8_cherries: "s8_cherries",
    s8_plums: "s8_plums",
    s8_otherStoneFruit: "s8_otherStoneFruit",
    s8_currant: "s8_currant",
    s8_strawberries: "s8_strawberries",
    s8_otherBerryFruit: "s8_otherBerryFruit"
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <StatementSection heading={t("statements.section1.heading")}>
          <StatementSectionTable>
            <StatementTableRow
              text={t("statements.section1.mushrooms")}
              tax="0.25"
              inputElement={
                <Controller
                  name={formKeys.s1_mushrooms}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.section1.tomatoCucumberHerbs")}
              tax="2.00"
              inputElement={
                <Controller
                  name={formKeys.s1_tomatoCucumberHerb}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              subText={t("statements.section1.boughtPlantsDesc")}
              tax="2.00"
              tooltip="Eksempel på hjælp til dette inputfelt."
              inputElement={
                <Controller
                  name={formKeys.s1_boughtPlants}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section3.heading")}>
          <StatementSectionTable>
            <StatementTableRow
              text={t("statements.section3.carrot")}
              tax="3.00"
              inputElement={
                <Controller
                  name={formKeys.s3_carrots}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.section3.pea")}
              tax="3.00"
              inputElement={
                <Controller
                  name={formKeys.s3_peas}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              subText={t("statements.section3.boughtPlantsDesc")}
              tax="3.00"
              inputElement={
                <Controller
                  name={formKeys.s3_boughtPlants}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section4.heading")}>
          <StatementSectionTable>
            <StatementTableRow
              text={t("statements.section4.onions")}
              tax="1.60"
              inputElement={
                <Controller
                  name={formKeys.s4_onions}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.section4.plants")}
              tax="1.60"
              inputElement={
                <Controller
                  name={formKeys.s4_plants}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.section4.flowers")}
              tax="1.60"
              inputElement={
                <Controller
                  name={formKeys.s4_cutFlowers}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              subText={t("statements.section3.boughtPlantsDesc")}
              tax="1.60"
              inputElement={
                <Controller
                  name={formKeys.s4_boughtPlants}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
          </StatementSectionTable>
        </StatementSection>
        <StatementSection heading={t("statements.section7.heading")}>
          <StatementSectionTable>
            <StatementTableRow
              text={t("statements.section7.plants")}
              tax="4.50"
              inputElement={
                <Controller
                  name={formKeys.s7_plants}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.boughtPlants")}
              tax="4.50"
              inputElement={
                <Controller
                  name={formKeys.s7_boughtPlants}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
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
            <StatementTableRow
              text={t("statements.section8.applesPearsOther")}
              tax="5.00"
              inputElement={
                <Controller
                  name={formKeys.s8_applesPearsEtc}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeadings h2={t("statements.expences")} />
            <StatementTableRow
              text={t("statements.section8.packagingCost")}
              subText={t("statements.section8.packagingCostDesc")}
              tax="5.00"
              inputElement={
                <Controller
                  name={formKeys.s8_packaging}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeading>
              {t("statements.section8.subHeading2")}
            </StatementTableSubHeading>
            <StatementTableSubHeadings
              h2={t("statements.turnoverExlMoms")}
              h3={t("statements.taxIs")}
            />
            <StatementTableRow
              text={t("statements.section8.cherry")}
              tax="4.65"
              inputElement={
                <Controller
                  name={formKeys.s8_cherries}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.section8.plum")}
              tax="4.65"
              inputElement={
                <Controller
                  name={formKeys.s8_plums}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.other")}
              tax="4.65"
              inputElement={
                <Controller
                  name={formKeys.s8_otherStoneFruit}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableSubHeading>
              {t("statements.section8.subHeading3")}
            </StatementTableSubHeading>
            <StatementTableSubHeadings
              h2={t("statements.turnoverExlMoms")}
              h3={t("statements.taxIs")}
            />
            <StatementTableRow
              text={t("statements.section8.currant")}
              tax="4.60"
              inputElement={
                <Controller
                  name={formKeys.s8_currant}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.section8.strawberry")}
              tax="4.60"
              inputElement={
                <Controller
                  name={formKeys.s8_strawberries}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
            <StatementTableRow
              text={t("statements.other")}
              tax="4.60"
              inputElement={
                <Controller
                  name={formKeys.s8_otherBerryFruit}
                  control={control}
                  defaultValue={false}
                  rules={{ required: false }}
                  render={({ onChange, value }) => <InputDKK value={value} onChange={onChange} />}
                />
              }
            />
          </StatementSectionTable>
        </StatementSection>
      </Stack>
      <Button type="submit">Test</Button>
    </form>
  );
};
export default StatementForm;
