import { Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { AuthStage } from "hooks/useAuth";
import { FC, useCallback, useContext } from "react";

import LoginForm from "./LoginForm";

const Login: FC = props => {
  const { authStage } = useContext(AuthContext);

  const displayLoginForm = useCallback(() => {
    if (authStage == AuthStage.UNAUTHENTICATED) {
      return <LoginForm />;
    }
  }, [authStage]);

  return (
    <Grid gridTemplateColumns="1fr minmax(400px, 400px) 1fr" h="100vh" alignItems="center">
      <GridItem colStart={2} shadow="lg" maxH="400px">
        <Flex bg="gray.700" justifyContent="center">
          <Image src="images/icons/logo.svg" position="relative" right="15px" pb="15px"></Image>
        </Flex>
        <Flex direction="column" justifyContent="center" p={[10]}>
          {displayLoginForm()}
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default Login;
