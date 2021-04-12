import Statement from "components/Statement/Statement";
import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { ParsedUrlQuery } from "node:querystring";

interface Props {
  statementId: number;
}

const StatementPage: NextPage<Props> = ({ statementId }) => {
  return <Statement id={statementId} />;
};

export const getServerSideProps: GetServerSideProps<I18nProps<Locale> & Props> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  const statementId = parseInt(context.query.statementId as string);

  return {
    props: { table, statementId }
  };
};

/*
export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  return {
    paths: [],
    fallback: false
  };
};
*/

export default StatementPage;
