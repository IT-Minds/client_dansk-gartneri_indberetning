import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { FC } from "react";

import HeaderButtons from "./HeaderBtns/HeaderBtns";

const StatementFormHeader: FC = () => {
  const { headerBg } = useColors();
  return (
    <Flex
      justifyContent="space-between"
      shadow="sm"
      alignItems="center"
      pl={[1, 5, 10]}
      pr={[3, 5, 10]}
      bg={headerBg}
      position="fixed"
      w="100vw"
      zIndex={100}>
      <Image src="images/icons/logo.svg" position="relative" pb="15px" h="60px"></Image>
      <HStack>
        <Button colorScheme="green" rounded="full">
          Gem ændringer
        </Button>
        <Button colorScheme="blue" rounded="full">
          Underskriv og send
        </Button>
      </HStack>
      <Flex flexDirection="row" display={["none", null, "flex"]}>
        <HeaderButtons />
      </Flex>
    </Flex>
  );
};
export default StatementFormHeader;
