import { FormControl, FormLabel, Grid, Input, ModalHeader, Spacer } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

interface Props {
  className?: string;
}

const NewAccountForm: FC<Props> = (props: Props) => {
  const handleSubmit = useCallback((e: React.FormEvent) => {}, []);

  const { t } = useLocales();
  return (
    <form>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input type="email"></Input>
      </FormControl>
      <FormControl id="tel" isRequired>
        <FormLabel htmlFor="email">{t("accounts.tel")}</FormLabel>
        <Input type="email"></Input>
      </FormControl>
      <FormControl id="cvr" isRequired>
        <FormLabel htmlFor="cvr">{t("accounts.cvrNumber")}</FormLabel>
        <Input></Input>
      </FormControl>
      <Spacer h={5} />
      <ModalHeader p={0} mb={5}>
        {t("accounts.address")}
      </ModalHeader>
      <Grid gridTemplateColumns="2fr 1fr" gap={2}>
        <FormControl id="street">
          <FormLabel htmlFor="street">{t("accounts.street")}</FormLabel>
          <Input></Input>
        </FormControl>
        <FormControl id="streetNum">
          <FormLabel htmlFor="streetNum">{t("accounts.streetNum")}</FormLabel>
          <Input></Input>
        </FormControl>
        <FormControl id="city">
          <FormLabel htmlFor="city">{t("accounts.city")}</FormLabel>
          <Input></Input>
        </FormControl>
        <FormControl id="postCode">
          <FormLabel htmlFor="postCode">{t("accounts.postCode")}</FormLabel>
          <Input></Input>
        </FormControl>
      </Grid>
    </form>
  );
};
export default NewAccountForm;
