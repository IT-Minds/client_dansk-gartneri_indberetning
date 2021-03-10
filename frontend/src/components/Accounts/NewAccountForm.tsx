import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  ModalHeader,
  Spacer
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genAccountClient } from "services/backend/apiClients";
import {
  CreateAccountCommand,
  CreateAccountDto,
  ICreateAccountDto
} from "services/backend/nswagts";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
}

const NewAccountForm: FC<Props> = ({ onSubmit }) => {
  const [localForm, setLocalAccountForm] = useState<ICreateAccountDto>(new CreateAccountDto());

  const formUpdateReform = (value: unknown, key: keyof typeof localForm) => {
    setLocalAccountForm(form => {
      (form[key] as unknown) = value;
      return form;
    });
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formUpdateReform(e.target.value, e.target.id as keyof typeof localForm);
    },
    [formUpdateReform, localForm]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(localForm);
      const accountClient = await genAccountClient();
      await accountClient.createAccount(
        new CreateAccountCommand({
          account: localForm
        })
      );
      onSubmit(e);
    },
    [localForm]
  );

  /*
  const handleGetFromCvr = useCallback(() => {
    fetch("https://cvrapi.dk/api?country=dk&vat=" + localForm.cvrNumber)
      .then(res => res.json())
      .then(
        result => {
          setName(result.name ? result.name : "");
          setEmail(result.email ? result.email : "");
          setTel(result.phone ? result.phone : "");
          setStreet1(result.address ? result.address.split(/[0-9]/)[0].trim() : "");
          setStreetNum1(
            result.address ? result.address.substring(result.address.search(/\d/)) : ""
          );
          setPostcode1(result.zipcode ? result.zipcode : "");
          setCity1(result.city ? result.city : "");
        },
        error => {
          console.error("Error when trying to fetch from CVR-registry");
        }
      );
  }, [cvr]);
  */

  const { t } = useLocales();
  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input value={localForm.name} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input type="email" value={localForm.email} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="tel" isRequired>
        <FormLabel htmlFor="email">{t("accounts.tel")}</FormLabel>
        <Input type="tel" value={localForm.tel} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="cvrNumber" isRequired>
        <FormLabel htmlFor="cvrNumber">{t("accounts.cvrNumber")}</FormLabel>
        <Input value={localForm.cvrNumber} onChange={handleInputChange}></Input>
        <Button
          onClick={() => {
            return null;
          }}
          variant="ghost"
          size="xs">
          Hent info fra CVR-registret
        </Button>
      </FormControl>
      <Spacer h={5} />
      <ModalHeader p={0} mb={5}>
        {t("accounts.address")}
      </ModalHeader>
      <Grid gridTemplateColumns="2fr 1fr" gap={2}>
        <FormControl id="addressLine1">
          <FormLabel htmlFor="addressLine1">{t("accounts.street")}</FormLabel>
          <Input value={localForm.addressLine1} onChange={handleInputChange}></Input>
        </FormControl>
        <FormControl id="addressLine2">
          <FormLabel htmlFor="addressLine2">{t("accounts.streetNum")}</FormLabel>
          <Input value={localForm.addressLine2} onChange={handleInputChange}></Input>
        </FormControl>
        <FormControl id="addressLine3">
          <FormLabel htmlFor="addressLine3">{t("accounts.city")}</FormLabel>
          <Input value={localForm.addressLine3} onChange={handleInputChange}></Input>
        </FormControl>
        <FormControl id="addressLine4">
          <FormLabel htmlFor="addressLine4">{t("accounts.postCode")}</FormLabel>
          <Input value={localForm.addressLine4} onChange={handleInputChange}></Input>
        </FormControl>
      </Grid>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default NewAccountForm;
