import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalHeader,
  Spacer,
  Text
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import {
  CreateAccountantCommand,
  IAccountDto,
  IUserAccountIdDto,
  RoleEnum,
  UserAccountIdDto
} from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  onSubmit?: (e: React.FormEvent) => void;
}

const AddNewAccountantForm: FC<Props> = ({ account, onSubmit }) => {
  const { t } = useLocales();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      console.log(account);
      const accountantDto = new UserAccountIdDto({
        accountId: 1,
        name: name,
        email: email,
        role: RoleEnum.Accountant
      });
      console.log(accountantDto);

      const userClient = await genUserClient();
      await userClient.createAndAddAccountant(
        new CreateAccountantCommand({
          accountantDto: accountantDto
        })
      );
      onSubmit(e);
    },
    [name, email]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Text>{account.id}</Text>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input value={name} onChange={e => setName(e.target.value)}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
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
