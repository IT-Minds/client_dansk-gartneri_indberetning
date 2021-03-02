import { chakra, Flex, Image, Spacer } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";

import HeaderDrawer from "./Drawer/Drawer";
import HeaderButtons from "./HeaderBtns/HeaderBtns";
import HeaderLinks from "./HeaderLinks/HeaderLinks";

const Header: FC = () => {
  return (
    <>
      <Flex
        justifyContent="space-between"
        shadow="sm"
        alignItems="center"
        pl={[1, 5, 10]}
        pr={[3, 5, 10]}
        bg="gray.700"
        fontFamily="Open Sans Condensed">
        <Image src="images/icons/logo.svg" position="relative" pb="15px"></Image>
        <Flex flexDirection="row" display={["none", null, "flex"]}>
          <HeaderLinks />
          <Spacer w={10} />
          <HeaderButtons />
        </Flex>
        <chakra.div display={["block", null, "none"]}>
          <HeaderDrawer />
        </chakra.div>
      </Flex>
    </>
  );
};
export default Header;
