import { Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { FC } from "react";

import LoginForm from "./LoginForm";

interface Props {
  className?: string;
}

const Login: FC<Props> = (props: Props) => {
  return (
    <Grid gridTemplateColumns="1fr minmax(400px, 400px) 1fr" h="100vh" alignItems="center">
      <GridItem colStart={2} shadow="lg" maxH="400px">
        <Flex bg="gray.700" justifyContent="center">
          <Image src="images/icons/logo.svg" position="relative" right="15px" pb="15px"></Image>
        </Flex>
        <Flex direction="column" justifyContent="center" p={[10]}>
          <LoginForm />
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default Login;
