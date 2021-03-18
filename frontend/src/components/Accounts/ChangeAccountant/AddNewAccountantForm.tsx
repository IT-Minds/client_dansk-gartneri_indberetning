import { Button, Flex, FormControl, FormLabel, Input, ModalHeader, Spacer } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import {
  CreateAccountantCommand,
  IAccountDto,
  IUserAccountIdDto,
  UserAccountIdDto
} from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  onSubmit: (e: React.FormEvent) => void;
}

const AddNewAccountantForm: FC<Props> = ({ account, onSubmit }) => {
  const { t } = useLocales();
  const [localForm, setLocalform] = useState<IUserAccountIdDto>(
    new UserAccountIdDto({ accountId: account.id })
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const userClient = await genUserClient();
      await userClient.createAndAddAccountant(
        new CreateAccountantCommand({
          accountantDto: localForm
        })
      );
      onSubmit(e);
    },
    [localForm]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input
          value={localForm.name}
          onChange={e => setLocalform({ ...localForm, ...{ name: e.target.value } })}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input
          type="email"
          value={localForm.email}
          onChange={e => setLocalform({ ...localForm, ...{ email: e.target.value } })}></Input>
      </FormControl>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default AddNewAccountantForm;
