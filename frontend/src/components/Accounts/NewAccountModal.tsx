import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useState } from "react";

import NewAccountForm from "./NewAccountForm";

interface Props {
  className?: string;
  onSubmit: () => Promise<void>;
}

const NewAccountModal: FC<Props> = (props: Props) => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(() => {
    onClose();
    props.onSubmit();
  }, []);

  return (
    <>
      <Button rounded="full" colorScheme="blue" textColor={buttonFont} onClick={onOpen}>
        {t("accounts.addAccount")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accounts.addAccount")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewAccountForm onSubmit={handleSubmit} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default NewAccountModal;
/*
<Button colorScheme="green" mr={3} onClick={onClose}>
              {t("common.add")}
            </Button>
*/
