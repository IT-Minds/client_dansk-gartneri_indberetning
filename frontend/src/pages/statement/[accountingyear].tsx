import Statement from "components/Statement/Statement";
import { Locale } from "i18n/Locale";
// import { runTimeTable } from "i18n/runtimeTable";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import { ParsedUrlQuery } from "node:querystring";

const StatementPage: NextPage = () => {
  const router = useRouter();
  const { accountingyear } = router.query;
  return <Statement id={accountingyear} />;
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  return {
    props: { table }
  };
};

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  const paths = [];
  for (let i = 0; i < 50; i++) {
    paths.push("/statement/" + i);
  }
  return {
    paths: paths,
    fallback: false
  };
};

export default StatementPage;
