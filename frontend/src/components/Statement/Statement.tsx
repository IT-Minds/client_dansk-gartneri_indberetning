import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import BasicLayout from "components/Layouts/BasicLayout";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementDto, UpdateStatementCommand } from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementForm from "./StatementForm";

interface Props {
  id: string | string[];
}

const Statement: FC<Props> = ({ id }) => {
  const { t } = useLocales();
  const router = useRouter();
  const toast = useToast();
  const [statement, setStatement] = useState<IStatementDto>(null);
  const [isSaving, setIsSaving] = useState(false);
  const methods = useForm();

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getStatement(parseInt(id as string));

      if (data != null) setStatement(data);
      else {
        logger.info("statementClient.get no data");
        //router.push("/mystatements");
      }
    } catch (err) {
      logger.warn("statementClient.get Error", err);
      router.push("mystatements");
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const onSaveChanges = useCallback(async () => {
    setIsSaving(true);
    console.log(statement);
    try {
      const statementClient = await genStatementClient();
      const command = new UpdateStatementCommand({ statementDto: statement });
      console.log(command);
      await statementClient.updateStatement(statement.id, command);
      toast({
        title: t("common.saveSuccessTitle"),
        description: t("common.saveSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    } catch (err) {
      logger.warn("statementClient.put Error", err);
      toast({
        title: t("common.saveErrorTitle"),
        description: t("common.saveErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
    setIsSaving(false);
  }, [statement]);

  const onSubmit = useCallback(() => {
    console.log("submitting!");
  }, []);

  const all = methods.watch();

  useEffect(() => {
    //console.log(all);
  }, [all]);

  return (
    <FormProvider {...methods}>
      <BasicLayout variant="statementHeader" maxW="1000px">
        <HStack>
          <Button colorScheme="green" rounded="full" onClick={onSaveChanges}>
            Gem ændringer
          </Button>
          <Button colorScheme="blue" rounded="full" type="submit" form="statement_form">
            Underskriv og send
          </Button>
        </HStack>
        <StatementForm statement={statement} setStatement={setStatement} />
      </BasicLayout>
    </FormProvider>
  );
};
export default Statement;
//statement={statement}
/*
fetchStatement: fetchData,
        statement: statement,
        setStatement: setStatement,
        save: onSaveChanges,
        isSaving: isSaving,
        submit: onSubmit
*/
/*
    <EditStatementContext.Provider
      value={{
        fetchStatement: fetchData,
        statement: statement,
        setStatement: setStatement,
        save: onSaveChanges,
        isSaving: isSaving,
        submit: onSubmit
      }}>
      <BasicLayout variant="statementHeader" maxW="1000px">
        <StatementForm />
      </BasicLayout>
    </EditStatementContext.Provider>
*/
