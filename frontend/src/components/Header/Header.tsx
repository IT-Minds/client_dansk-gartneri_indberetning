import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

import HeaderButtons from "./HeaderBtns/HeaderBtns";

const Header: FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      shadow="sm"
      alignItems="center"
      pl={[1, 5, 10]}
      pr={[3, 5, 10]}
      bg="gray.700">
      <Image src="images/icons/logo.svg" position="relative" pb="15px"></Image>
      <Flex flexDirection="row" display={["none", null, "flex"]}>
        <HeaderButtons />
      </Flex>
    </Flex>
  );
};
export default Header;
