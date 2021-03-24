import { Button, Flex, FormControl, FormLabel, Input, Stack, useToast } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import {
  CreateAccountantCommand,
  IAccountDto,
  RoleEnum,
  UserAccountIdDto
} from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  onSubmit?: (success: boolean) => void;
}

const AddNewAccountantForm: FC<Props> = ({ account, onSubmit }) => {
  const { t } = useLocales();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const accountantDto = new UserAccountIdDto({
        id: 1,
        accountId: account.id,
        name: name,
        email: email,
        role: RoleEnum.Accountant
      });
      accountantDto.accountId = account.id;

      try {
        const userClient = await genUserClient();
        const command = new CreateAccountantCommand({
          accountantDto: accountantDto
        });
        await userClient.createAndAddAccountant(command);
        toast({
          title: t("accountant.addSuccessTitle"),
          description: t("accountant.addSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
        onSubmit(true);
      } catch {
        toast({
          title: t("accountant.addErrorTitle"),
          description: t("accountant.addErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    },
    [name, email]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl id="name" isRequired isDisabled={account.accountant != null}>
          <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id="email" isRequired isDisabled={account.accountant != null}>
          <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
        </FormControl>
        <Flex justifyContent="flex-end" w="100%" mt={5}>
          <Button colorScheme="green" type="submit" disabled={account.accountant != null}>
            {t("common.add")}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default AddNewAccountantForm;
