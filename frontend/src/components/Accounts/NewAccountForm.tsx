import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Link,
  ModalHeader,
  Spacer
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genAccountClient } from "services/backend/apiClients";
import { CreateAccountCommand } from "services/backend/nswagts";

interface Props {
  className?: string;
  onSubmit: (e: React.FormEvent) => void;
}

const NewAccountForm: FC<Props> = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [cvr, setCvr] = useState<string>("");
  const [street1, setStreet1] = useState<string>("");
  const [streetNum1, setStreetNum1] = useState<string>("");
  const [postcode1, setPostcode1] = useState<string>("");
  const [city1, setCity1] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const accountClient = await genAccountClient();
      await accountClient.createAccount(
        new CreateAccountCommand({
          account: {
            email: email,
            name: name,
            tel: tel,
            cvrNumber: cvr,
            address1: {
              streetName: street1,
              streetNumber: streetNum1,
              postCode: postcode1,
              city: city1,
              country: "Danmark" //What should we do here?
            }
          }
        })
      );
      props.onSubmit(e);
    },
    [email, name, tel, cvr, street1, streetNum1, postcode1, city1]
  );

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleTelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTel(e.target.value);
  }, []);

  const handleCvrChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCvr(e.target.value);
  }, []);

  const handleStreet1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet1(e.target.value);
  }, []);

  const handleStreetNum1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetNum1(e.target.value);
  }, []);

  const handleCity1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCity1(e.target.value);
  }, []);

  const handlePostCode1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode1(e.target.value);
  }, []);

  const handleGetFromCvr = useCallback(() => {
    fetch("https://cvrapi.dk/api?country=dk&vat=" + cvr)
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

  const { t } = useLocales();
  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input value={name} onChange={handleNameChange}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange}></Input>
      </FormControl>
      <FormControl id="tel" isRequired>
        <FormLabel htmlFor="email">{t("accounts.tel")}</FormLabel>
        <Input type="tel" value={tel} onChange={handleTelChange}></Input>
      </FormControl>
      <FormControl id="cvr" isRequired>
        <FormLabel htmlFor="cvr">{t("accounts.cvrNumber")}</FormLabel>
        <Input value={cvr} onChange={handleCvrChange}></Input>
        <Button onClick={handleGetFromCvr} variant="ghost" size="xs">
          Hent info fra CVR-registret
        </Button>
      </FormControl>
      <Spacer h={5} />
      <ModalHeader p={0} mb={5}>
        {t("accounts.address")}
      </ModalHeader>
      <Grid gridTemplateColumns="2fr 1fr" gap={2}>
        <FormControl id="street">
          <FormLabel htmlFor="street">{t("accounts.street")}</FormLabel>
          <Input value={street1} onChange={handleStreet1Change}></Input>
        </FormControl>
        <FormControl id="streetNum">
          <FormLabel htmlFor="streetNum">{t("accounts.streetNum")}</FormLabel>
          <Input value={streetNum1} onChange={handleStreetNum1Change}></Input>
        </FormControl>
        <FormControl id="city">
          <FormLabel htmlFor="city">{t("accounts.city")}</FormLabel>
          <Input value={city1} onChange={handleCity1Change}></Input>
        </FormControl>
        <FormControl id="postCode">
          <FormLabel htmlFor="postCode">{t("accounts.postCode")}</FormLabel>
          <Input value={postcode1} onChange={handlePostCode1Change}></Input>
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
