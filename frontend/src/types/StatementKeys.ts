import { IStatementDto } from "services/backend/nswagts";

export type StatementKeys = {
  s1_mushrooms: keyof IStatementDto;
  s1_tomatoCucumberHerb: keyof IStatementDto;
  s1_boughtPlants: keyof IStatementDto;
  s3_carrots: keyof IStatementDto;
  s3_peas: keyof IStatementDto;
  s3_onions: keyof IStatementDto;
  s3_other: keyof IStatementDto;
  s3_boughtPlants: keyof IStatementDto;
  s4_onions: keyof IStatementDto;
  s4_plants: keyof IStatementDto;
  s4_cutFlowers: keyof IStatementDto;
  s4_boughtPlants: keyof IStatementDto;
  s7_plants: keyof IStatementDto;
  s7_boughtPlants: keyof IStatementDto;
  s8_applesPearsEtc: keyof IStatementDto;
  s8_packaging: keyof IStatementDto;
  s8_cherries: keyof IStatementDto;
  s8_plums: keyof IStatementDto;
  s8_otherStoneFruit: keyof IStatementDto;
  s8_currant: keyof IStatementDto;
  s8_strawberries: keyof IStatementDto;
  s8_otherBerryFruit: keyof IStatementDto;
};
