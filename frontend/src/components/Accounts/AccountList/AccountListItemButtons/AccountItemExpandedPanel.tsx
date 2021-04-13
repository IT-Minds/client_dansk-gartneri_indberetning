import { Divider, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IAccountDto } from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
}

const AccountItemExpandedPanel: FC<Props> = ({ account }) => {
  const { t } = useLocales();

  return (
    <HStack spacing={20}>
      <Stack spacing={0} w="max-content">
        <Divider mb={3} />
        <Text>CVR: {account.cvrNumber}</Text>
        <Text>Email: {account.email}</Text>
        <Text>Tlf: {account.tel}</Text>
        <Text>
          Adresse:
          {` ${account.address.addressLine1} ${account.address.addressLine2} ${account.address.addressLine3} ${account.address.addressLine4}`}
        </Text>
      </Stack>
      {account.accountant && (
        <Stack spacing={0} w="max-content">
          <Heading size="xs">Revisor</Heading>
          <Text>Navn: {account.accountant.name}</Text>
          <Text>Email: {account.accountant.email}</Text>
        </Stack>
      )}
    </HStack>
  );
};
export default AccountItemExpandedPanel;
