import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { BiMenu } from "react-icons/bi";

const HeaderDrawer: FC = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        aria-label="Open drawer"
        icon={<BiMenu />}
        ref={btnRef}
        onClick={onOpen}
        isRound={true}
        size="sm"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              <Stack>{/*content here*/}</Stack>
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default HeaderDrawer;
