import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Head from "next/head";
import { FC, useCallback } from "react";
import { IAccountDto } from "services/backend/nswagts";

import AddNewAccountantForm from "./AddNewAccountantForm";
import CurrentAccountant from "./CurrentAccountant";

interface Props {
  account: IAccountDto;
  onSubmit?: () => Promise<void>;
}

const ChangeAccountantModal: FC<Props> = ({ account, onSubmit }) => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(() => {
    onClose();
    onSubmit();
  }, []);

  return (
    <>
      <Button rounded="full" colorScheme="blue" textColor={buttonFont} onClick={onOpen}>
        Revisor
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rediger revisor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Heading size="sm">Revisor:</Heading>
              <CurrentAccountant account={account} />
              <Divider />
              <Heading size="md">Tilføj ny revisor</Heading>
              <AddNewAccountantForm account={account} />
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChangeAccountantModal;
